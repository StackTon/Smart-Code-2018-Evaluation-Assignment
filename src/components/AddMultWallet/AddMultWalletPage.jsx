import React, { Component } from 'react';
import Input from '../common/Input';
import { getWeb3, MutSigWalletABI } from '../../api/remote.js';

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
        //TODO check if address is valid

        const contractInstance = this.state.web3.eth.contract(MutSigWalletABI).at(this.state.walletAddress);

        contractInstance.MAX_OWNER_COUNT.call((err, res) => {
            handleError(err);

            //TODO implement better checking for mutSig walltes
            if (Number(res + '') === 50) {
                this.state.web3.eth.getBalance(this.state.walletAddress, (err, contractBalance) => {
                    handleError(err);

                    let addressDetails = {};
                    addressDetails.balance = this.state.web3.fromWei(contractBalance, 'ether');

                    contractInstance.getOwners.call((err, owners) => {
                        handleError(err);

                        addressDetails.owners = owners;

                        contractInstance.dailyLimit.call((err, dailyLimit) => {
                            handleError(err);

                            addressDetails.dailyLimit = dailyLimit + '';

                            contractInstance.required.call((err, required) => {
                                handleError(err);

                                addressDetails.required = required + '';

                                let newWalletAddress = this.state.walletAddress;

                                if (this.state.walletName !== '') {
                                    newWalletAddress = `${this.state.walletName} (${this.state.walletAddress})`
                                }

                                // TODO implement usage statistics
                                contractInstance.transactionCount.call((err, transactionCount) => {
                                    handleError(err);

                                    addressDetails.transactionCount = Number(transactionCount + '');

                                    addressDetails.averageTransactionAmount = 0;

                                    for (let i = 0; i < transactionCount; i++) {
                                        contractInstance.transactions.call(i, (err, transactionInfo) => {
                                            let ethers = this.state.web3.fromWei(transactionInfo.value, 'ether');
                                            addressDetails.averageTransactionAmount += ethers;
                                        })

                                        if (i === transactionCount - 1) {
                                            addressDetails.averageTransactionAmount /= addressDetails.transactionCount;
                                            console.log(addressDetails)
                                            localStorage.setItem(newWalletAddress, JSON.stringify(addressDetails));
                                        }
                                    }

                                })

                                

                            })
                        })
                    })
                });
            }
        })
    }

    render() {
        return (
            <div>
                <h2>Add Mult Sig Wallet</h2>
                <form onSubmit={this.onSubmitHandler}>
                    <Input
                        name='walletAddress'
                        value={this.state.walletAddress}
                        onChange={this.onChangeHandler}
                        label='Wfallet Address'
                    />

                    <Input
                        name='walletName'
                        value={this.state.walletName}
                        onChange={this.onChangeHandler}
                        label='Wallet Name (optional)'
                    />
                    <input type='submit' value='Add' />
                </form>
            </div>
        );
    }
}

function handleError(err) {
    if (err) {
        console.log(err);
        return;
    }
}

export default AddMultWallet;
