import React, { Component } from 'react';

class ListAllMultWallets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            wallets: []
        }

        // bind

        this.walletDelete = this.walletDelete.bind(this);
        this.walletSetNamesToAddress = this.walletSetNamesToAddress.bind(this);
    }

    componentDidMount() {
        let wallets = [];
        for (let key in localStorage) {
            if (key === 'length') {
                break;
            }

            let addressDetails = JSON.parse(localStorage.getItem(key));

            let wallet = {
                'address': key,
                'walletName': addressDetails.walletName,
                'balance': addressDetails.balance,
                'owners': addressDetails.owners,
                'required': addressDetails.required,
                'dailyLimit': addressDetails.dailyLimit,
                'averageTransactionAmount': addressDetails.averageTransactionAmount,
                'transactionCount': addressDetails.transactionCount
            };

            wallets.push(wallet);

        }

        this.setState({ wallets });

    }

    walletDelete(address) {
        localStorage.removeItem(address);

        let wallets = this.state.wallets;

        for (let i = 0; i < wallets.length; i++) {
            const wallet = wallets[i];
            if(wallet.address === address){
            
                wallets.splice(i, 1);
            }
        }

        this.setState({ wallets });
    }

    walletSetNamesToAddress(address) {
        this.props.history.push('/wallet/' + address);
    }

    render() {
        return (
            <div>
                <h1>List All Mult Sig Wallets</h1>
                <section>
                    {this.state.wallets.map((walletData) => {
                        let walletName = walletData.address;
                        if(walletData.walletName !== ''){
                            walletName = `${walletData.walletName} (${walletData.address})`
                        }

                        return (
                            <article key={walletData.address}>
                                <div>address: {walletName}</div>
                                <div>balance: {walletData.balance} Ether</div>
                                <div>owners: {walletData.owners.map((ownerAddress) => {
                                    return <p key={ownerAddress}>{ownerAddress}</p>
                                })}</div>
                                <div>required: {walletData.required} of {walletData.owners.length} </div>
                                <div>dailyLimit: {walletData.dailyLimit} Ether</div>
                                <div>Transaction Count: {walletData.transactionCount}</div>
                                <div>Average Transaction Amount: {walletData.averageTransactionAmount}</div>
                                <button onClick={() => this.walletDelete(walletData.address)}>Delete</button>
                                <button onClick={() => this.walletSetNamesToAddress(walletData.address)}>Edit</button>
                            </article>
                        )
                    })}

                </section>
            </div>
        );
    }
}

export default ListAllMultWallets;
