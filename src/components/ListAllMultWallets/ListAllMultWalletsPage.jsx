import React, { Component } from 'react';
import toastr from 'toastr';

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
            if (wallet.address === address) {

                wallets.splice(i, 1);
            }
        }

        toastr.success('The wallet was deleted successfully');
        this.setState({ wallets });
    }

    walletSetNamesToAddress(address) {
        this.props.history.push('/wallet/' + address);
    }

    render() {
        return (
            <div>
                <h1>List All Multi Signature Wallets</h1>
                <section>
                    {this.state.wallets.map((walletData) => {
                        let walletName = walletData.address;
                        if (walletData.walletName !== '') {
                            walletName = `${walletData.walletName} (${walletData.address})`;
                        }

                        return (
                            <article className='card' key={walletData.address}>
                                <table className='card-body table table-borderless'>
                                    <tbody>
                                        <tr className='card-text'>
                                            <td>Address:</td>
                                            <td>{walletName}</td>
                                        </tr>
                                        <tr className='card-text'>
                                            <td>Balance:</td>
                                            <td>{walletData.balance} Ethers</td>
                                        </tr>
                                        <tr className='card-text'>
                                            <td>Owners:</td>
                                            <td>
                                                <ul className='list-group'>
                                                    {walletData.owners.map((owner) => {
                                                        let ownerName = owner.address;
                                                        if (owner.name !== '') {
                                                            ownerName = (
                                                                <div>
                                                                    <p>{owner.name}</p>
                                                                    <p>({owner.address})</p>
                                                                </div>
                                                            )
                                                        }
                                                        return <li className='list-group-item' key={owner.address}>
                                                            {ownerName}
                                                        </li>
                                                    })}
                                                </ul>
                                            </td>

                                        </tr>
                                        <tr className='card-text'>
                                            <td>Number of owner signatures required to confirm a transaction:</td>
                                            <td>{walletData.required} of {walletData.owners.length}</td>
                                        </tr>
                                        <tr className='card-text'>
                                            <td>Daily Limit:</td>
                                            <td>{walletData.dailyLimit} Ethers</td>
                                        </tr>
                                        <tr className='card-text'>
                                            <td>Total transactions:</td>
                                            <td>{walletData.transactionCount}</td>
                                        </tr>
                                        <tr className='card-text'>
                                            <td>Average Transaction Amount:</td>
                                            <td>{walletData.averageTransactionAmount} Ethers</td>
                                        </tr>

                                    </tbody>
                                </table >
                                <div className='buttons'>
                                    <button type='button' className='btn btn-danger btn-lg' onClick={() => this.walletDelete(walletData.address)}>Delete</button>
                                    <button type='button' className='btn btn-info btn-lg' onClick={() => this.walletSetNamesToAddress(walletData.address)}>Set custom names</button>
                                </div>
                            </article>
                        )
                    })}
                </section>
            </div>
        );
    }
}

export default ListAllMultWallets;
