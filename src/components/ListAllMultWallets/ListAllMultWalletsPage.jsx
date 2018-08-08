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
                'balance': addressDetails.balance,
                'owners': addressDetails.owners,
                'required': addressDetails.required,
                'dailyLimit': addressDetails.dailyLimit
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

                        return (
                            <article key={walletData.address}>
                                <div>address: {walletData.address}</div>
                                <div>balance: {walletData.balance} Ether</div>
                                <div>owners: {walletData.owners.map((ownerAddress) => {
                                    return <p key={ownerAddress}>{ownerAddress}</p>
                                })}</div>
                                <div>required: {walletData.required} Ether</div>
                                <div>dailyLimit: {walletData.dailyLimit} Ether</div>
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
