import React, { Component } from 'react';
import Input from '../common/Input';

class AddMultWallet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            address: ""
        }

        //binding
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler() {
        //TODO check if address is valid

        //TODO implment add wallet form eth blockchain 

        //TOOD if the address is not for mut sig wallet display error
    }

    render() {
        return (
            <div>
                <h2>Add Mult Sig Wallet</h2>
                    <form onSubmit={this.onSubmitHandler}>
                        <Input
                            name="address"
                            value={this.state.address}
                            onChange={this.onChangeHandler}
                            label="Address"
                        />
                        <input className="btn btn-outline-primary" type="submit" value="Add" />
                    </form>
            </div>
        );
    }
}

export default AddMultWallet;
