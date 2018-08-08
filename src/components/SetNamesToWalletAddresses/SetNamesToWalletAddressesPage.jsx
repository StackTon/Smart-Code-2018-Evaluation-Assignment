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

        this.setState({ walletData: JSON.parse(localStorage.getItem(this.props.match.params.walletAddress)) });


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

        let walletData = this.state.walletData

        walletData.walletName = this.state.walletName;

        this.setState({ walletData });

        localStorage.setItem(this.state.walletAddress, JSON.stringify(walletData));

    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        let walletName = this.state.walletAddress;
        if (this.state.walletData.walletName !== '') {
            walletName = `${this.state.walletData.walletName} (${this.state.walletAddress})`
        }

        return (
            <div>
                <h1>Edit Mult Sig Wallet: {walletName}</h1>
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
