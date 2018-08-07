import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <header>
                <NavLink exact to="/">List Mult Sig Wallents</NavLink>
                <NavLink to="/add">Add Mult Sig Wallet</NavLink>
            </header>
        );
    }
}

export default Header;
