import React, { Component } from 'react';
import Input from '../common/Input';

class SetNamesToWalletAddresses extends Component {
    constructor(props) {
        super(props);

        this.state = {
            walletAddress: this.props.match.params.walletAddress,
            walletName: '',
            walletData: '',
            owenersHTML: ''
        }

        // bind
        this.onSubmitNameHandler = this.onSubmitNameHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    componentDidMount() {

        this.setState({ walletData:  JSON.parse(localStorage.getItem(this.props.match.params.walletAddress))});


        /* TODO implemt render owners address
        let ownersHTML = ''

        if (this.state.contractData) {
            console.log('qwewqe')
            this.state.contractData.owners.map((address, index) => {

                let ownerName = 'owner: ' + index
                this.setState({ ownerName: address })

                ownersHTML += (
                    <form onSubmit={() => { this.onSubmitEditOwnerHandler(address) }}>
                        <Input
                            name={ownerName}
                            value={address}
                            onChange={this.onChangeHandler}
                            label={ownerName}
                        />

                        <input type='submit' value='Edit' />
                    </form>
                )
            })
            this.setState(ownersHTML);
        }
        */

    }

    onSubmitNameHandler(e) {
        e.preventDefault();

        if (this.state.walletName !== '') {
            let regex = /(?:\()(.*)(?:\))/g;

            let oldWalletName = this.state.walletAddress

            let addr = regex.exec(this.state.walletAddress);

            let newWalletAddress = this.state.walletAddress;

            if (addr) {
                newWalletAddress = addr[1];
            }

            let contractFullName = this.state.walletName + ` (${newWalletAddress})`;

            this.setState({ walletAddress: contractFullName })

            localStorage.removeItem(oldWalletName);
            localStorage.setItem(contractFullName, JSON.stringify(this.state.walletData));
        }
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {

        return (
            <div>
                <h1>Edit Mult Sig Wallet: {this.state.walletAddress}</h1>
                <form onSubmit={this.onSubmitNameHandler}>
                    <Input
                        name='walletName'
                        value={this.state.walletName}
                        onChange={this.onChangeHandler}
                        label='Set name'
                    />

                    <input type='submit' value='Edit' />
                </form>


                {this.state.ownersHTML}
            </div>
        );
    }
}

export default SetNamesToWalletAddresses;
