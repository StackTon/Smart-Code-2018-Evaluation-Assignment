import React, { Component } from 'react';
import Input from '../common/Input';
import toastr from 'toastr';

class SetNamesToWalletAddresses extends Component {
    constructor(props) {
        super(props);

        this.state = {
            walletAddress: this.props.match.params.walletAddress,
            walletName: '',
            walletData: '',
            ownersState: []
        };

        // bind
        this.onSubmitNameHandler = this.onSubmitNameHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onChangeOwnerNameHandler = this.onChangeOwnerNameHandler.bind(this);
    }

    componentDidMount() {
        let walletData = JSON.parse(localStorage.getItem(this.props.match.params.walletAddress));

        this.setState({ walletData });
        this.setState({ walletName: walletData.walletName });

        walletData.owners.map((owner, index) => {
            let obj = { 'name': owner.name, 'address': owner.address };
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
        let index = [e.target.name][0];

        let owner = this.state.ownersState[e.target.name];

        owner.name = e.target.value;

        this.setState(prevState => {
            prevState.ownersState.splice(index, 1, owner);
            return { ownersState: prevState.ownersState };
        })
    }

    onSubmitNameHandler(e) {
        let walletData = this.state.walletData

        walletData.walletName = this.state.walletName;

        this.setState({ walletData });

        toastr.success('The wallet name was set successfully');

        localStorage.setItem(this.state.walletAddress, JSON.stringify(walletData));
    }

    onSubmitEditOwnerHandler(index, newName, address) {

        let walletAddress = this.state.walletAddress;

        let localStorageState = JSON.parse(localStorage.getItem(walletAddress));

        let newOwnerState = { 'name': newName, 'address': address };

        toastr.success('The wallet name was set successfully');

        localStorageState.owners[index] = newOwnerState;

        localStorage.setItem(walletAddress, JSON.stringify(localStorageState));
    }

    render() {
        let walletData = JSON.parse(localStorage.getItem(this.props.match.params.walletAddress))

        console.log(this.state);
        return (
            <div className='add'>
                <h2>Set custome names to wallet and owner address</h2>
                <form>
                    <Input
                        name='walletName'
                        value={this.state.walletName}
                        onChange={this.onChangeHandler}
                        label={'wallet: ' + this.state.walletAddress}
                    />

                    <input type='button' onClick={this.onSubmitNameHandler} className='btn btn-info btn-lg' value='Set custom name' />
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

                            <input type='button' onClick={() => { this.onSubmitEditOwnerHandler(index, this.state.ownersState[index].name, owner.address) }} className='btn btn-info btn-lg' value='Set custom name' />
                        </form>
                    )
                })}
            </div>
        );
    }
}

export default SetNamesToWalletAddresses;
