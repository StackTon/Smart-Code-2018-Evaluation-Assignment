import React, { Component } from 'react';
import Input from '../common/Input';
import { getWeb3, MutSigWalletABI } from '../../api/remote.js';
import toastr from 'toastr';
import { isNull } from 'util';

class AddMultWallet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            walletAddress: '',
            walletName: '',
            web3: null
        };

        //binding
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    componentDidMount() {
        getWeb3.then(results => {
            let coinbase = results.web3.eth.coinbase;
            this.setState({
                web3: results.web3,
                coinbase
            });

        }).catch((err) => {
            console.log(err);
            console.log('Error finding web3.');
        })
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    onSubmitHandler(e) {
        e.preventDefault();

        toastr.info('Loading...');

        const contractInstance = this.state.web3.eth.contract(MutSigWalletABI).at(this.state.walletAddress);
        if (!this.state.web3.isAddress(this.state.walletAddress)) {
            toastr.clear();
            toastr.error('Invalid address!!');
            return;
        }

        contractInstance.MAX_OWNER_COUNT.call((err, res) => {
            if (err) {
                toastr.clear();
                toastr.error('Invalid address!');
                console.log(err);
                return;
            }

            if(!isNull(localStorage.getItem(this.state.walletAddress))){
                toastr.clear();
                        toastr.error('This address already exist!');
                        console.log(err);
                        return;
            }

            if (Number(res + '') === 50) {
                this.state.web3.eth.getBalance(this.state.walletAddress, (err, contractBalance) => {
                    if (err) {
                        toastr.clear();
                        toastr.error('Invalid address!');
                        console.log(err);
                        return;
                    }

                    let addressDetails = { walletName: '' };
                    addressDetails.balance = this.state.web3.fromWei(contractBalance, 'ether');

                    contractInstance.getOwners.call((err, ownersArr) => {
                        if (err) {
                            toastr.clear();
                            toastr.error('Invalid address!');
                            console.log(err);
                            return;
                        }

                        let owners = [];

                        for (let owner of ownersArr) {
                            let obj = {};
                            obj.address = owner;
                            obj.name = '';
                            owners.push(obj);
                        }

                        addressDetails.owners = owners;

                        contractInstance.dailyLimit.call((err, dailyLimit) => {
                            if (err) {
                                toastr.clear();
                                toastr.error('Invalid address!');
                                console.log(err);
                                return;
                            }

                            addressDetails.dailyLimit = this.state.web3.fromWei(dailyLimit, 'ether');

                            contractInstance.required.call((err, required) => {
                                if (err) {
                                    toastr.clear();
                                    toastr.error('Invalid address!');
                                    console.log(err);
                                    return;
                                }

                                addressDetails.required = required + '';

                                let newWalletAddress = this.state.walletAddress;

                                if (this.state.walletName !== '') {
                                    addressDetails.walletName = this.state.walletName;
                                }

                                contractInstance.transactionCount.call((err, transactionCount) => {
                                    if (err) {
                                        toastr.clear();
                                        toastr.error('Invalid address!');
                                        console.log(err);
                                        return;
                                    }

                                    addressDetails.transactionCount = Number(transactionCount + '');

                                    let averageTransactionAmount = 0;

                                    if (addressDetails.transactionCount === 0) {
                                        addressDetails.averageTransactionAmount = 0;
                                        localStorage.setItem(newWalletAddress, JSON.stringify(addressDetails));
                                        toastr.clear();
                                        toastr.success('The new wallet was added successfully');
                                        this.props.history.push('');
                                    }

                                    for (let i = 0; i < transactionCount; i++) {
                                        if (i !== transactionCount - 1) {
                                            contractInstance.transactions.call(i, (err, transactionInfo) => {
                                                if (err) {
                                                    toastr.clear();
                                                    toastr.error('Invalid address!');
                                                    console.log(err);
                                                    return;
                                                }
                                                let ethers = Number(this.state.web3.fromWei(transactionInfo[1], 'ether') + '');
                                                averageTransactionAmount += ethers;

                                            })
                                        }
                                        else {
                                            contractInstance.transactions.call(i, (err, transactionInfo) => {
                                                if (err) {
                                                    toastr.clear();
                                                    toastr.error('Invalid address!');
                                                    console.log(err);

                                                }
                                                let ethers = Number(this.state.web3.fromWei(transactionInfo[1], 'ether') + '');
                                                averageTransactionAmount += ethers;
                                                averageTransactionAmount /= addressDetails.transactionCount;
                                                addressDetails.averageTransactionAmount = averageTransactionAmount;
                                                localStorage.setItem(newWalletAddress, JSON.stringify(addressDetails));
                                                toastr.clear()
                                                toastr.success('The new wallet was added successfully')
                                                this.props.history.push('');
                                            })
                                        }
                                    }
                                })
                            })
                        })
                    })
                });
            }
            else {
                toastr.clear();
                toastr.error('Invalid address!');
                return;
            }
        })
    }

    render() {
        return (
            <div className='add'>
                <h1>Add Multi Signature Wallet</h1>
                <form onSubmit={this.onSubmitHandler}>
                    <Input
                        name='walletAddress'
                        value={this.state.walletAddress}
                        onChange={this.onChangeHandler}
                        label='Wallet Address'
                    />

                    <Input
                        name='walletName'
                        value={this.state.walletName}
                        onChange={this.onChangeHandler}
                        label='Wallet Name (optional)'
                    />
                    <input type='submit' className='btn btn-info btn-lg' value='Add' />
                </form>
            </div>
        );
    }
}

export default AddMultWallet;
