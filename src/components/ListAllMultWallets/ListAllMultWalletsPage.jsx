import React, { Component } from 'react';

class ListAllMultWallets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            wallets: []
        }
    }

    componentDidMount() {
        let wallets = []
        for (let key in localStorage) {
            if (key === "length") {
                break;
            }
            let obj = {
                "address": key,
                "balance": localStorage.getItem(key)
            };

            wallets.push(obj);
        }

        this.setState({ wallets })

        // bind

        this.walletDelete = this.walletDelete.bind(this);
        this.walletDetails = this.walletDetails.bind(this);
    }

    walletDetails() {
        //TODO
    }

    walletDelete() {
        //TODO
    }

    render() {
        return (
            <div>
                <h1>List All Mult Sig Wallets</h1>
                <section>
                    {this.state.wallets.map((obj) => {
                        return (
                            <article key={obj.address}>
                                <div>address: {obj.address}</div>
                                <div>balance: {obj.balance} Ether</div>
                                <button onClick={this.walletDetails}>Details</button>
                                <button onClick={this.walletDelete}>Delete</button>
                            </article>
                        )
                    })}

                </section>
            </div>
        );
    }
}

export default ListAllMultWallets;
