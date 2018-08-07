import React, { Component } from 'react';
import Input from '../common/Input';
import { getWeb3, MutSigWalletABI } from '../../api/remote.js';

class AddMultWallet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            address: '',
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

        const contractInstance = this.state.web3.eth.contract(MutSigWalletABI).at(this.state.address);

        contractInstance.MAX_OWNER_COUNT.call((err, res) => {
            handleError(err);

            //TODO implement better checking for mutSig walltes
            if (Number(res + '') === 50) {
                this.state.web3.eth.getBalance(this.state.address, (err, contractBalance) => {
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
                                localStorage.setItem(this.state.address, JSON.stringify(addressDetails));
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
                        name='address'
                        value={this.state.address}
                        onChange={this.onChangeHandler}
                        label='Address'
                    />
                    <input className='btn btn-outline-primary' type='submit' value='Add' />
                </form>
            </div>
        );
    }
}

function handleError(err) {
    console.log(err);
    return;
}

export default AddMultWallet;
