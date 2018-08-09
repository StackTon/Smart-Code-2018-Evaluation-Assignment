import React, { Component } from 'react';
import Input from '../common/Input';

class SetNamesToWalletAddresses extends Component {
    constructor(props) {
        super(props);

        this.state = {
            walletAddress: this.props.match.params.walletAddress,
            walletName: '',
            walletData: '',
            ownersState: []
        }

        // bind
        this.onSubmitNameHandler = this.onSubmitNameHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onChangeOwnerNameHandler = this.onChangeOwnerNameHandler.bind(this);
    }

    componentDidMount() {
        let walletData = JSON.parse(localStorage.getItem(this.props.match.params.walletAddress));

        this.setState({ walletData });

        walletData.owners.map((owner, index) => {
            let obj = { 'name': owner.name, 'address': owner.address }
            this.setState(prevState => {

                prevState.ownersState.push(obj);
                return { ownersState: prevState.ownersState };
            })
        })
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onChangeOwnerNameHandler(e) {
        let index = [e.target.name][0]

        let owner = this.state.ownersState[e.target.name];

        owner.name = e.target.value;

        this.setState(prevState => {
            prevState.ownersState.splice(index, 1, owner)
            return { ownersState: prevState.ownersState }
        })
    }

    onSubmitNameHandler(e) {
        e.preventDefault();

        let walletData = this.state.walletData

        walletData.walletName = this.state.walletName;

        this.setState({ walletData });

        localStorage.setItem(this.state.walletAddress, JSON.stringify(walletData));
    }

    onSubmitEditOwnerHandler(index, newName, address) {

        let walletAddress = this.state.walletAddress

        let localStorageState = JSON.parse(localStorage.getItem(walletAddress));

        let newOwnerState = {'name': newName, 'address': address }

        localStorageState.owners[index] = newOwnerState

        localStorage.setItem(walletAddress, JSON.stringify(localStorageState))
    }

    render() {
        let walletName = this.state.walletAddress;
        if (this.state.walletData.walletName !== '') {
            walletName = `${this.state.walletData.walletName} (${this.state.walletAddress})`
        }

        let walletData = JSON.parse(localStorage.getItem(this.props.match.params.walletAddress))
        return (
            <div className='add'>
                <h2>Multi Signature Wallet : {walletName}</h2>
                <form onSubmit={this.onSubmitNameHandler}>
                    <Input
                        name='walletName'
                        value={this.state.walletName}
                        onChange={this.onChangeHandler}
                        label='Set name'
                    />

                    <input type='submit' className='btn btn-info' type='submit' value='Set' />
                </form>


                {walletData.owners.map((owner, index) => {

                    let ownerName = 'owner: ' + owner.address;

                    let ownerState = this.state.ownersState[index]

                    if (!ownerState) {
                        return
                    }

                    return (
                        <form key={owner.address}>
                            <Input
                                name={index}
                                value={this.state.ownersState[index].name}
                                onChange={this.onChangeOwnerNameHandler}
                                label={ownerName}
                            />

                            <input type='button' onClick={() => {this.onSubmitEditOwnerHandler(index, this.state.ownersState[index].name, owner.address) }} className='btn btn-info' value='Set' />
                        </form>
                    )
                })}
            </div>
        );
    }
}

export default SetNamesToWalletAddresses;
