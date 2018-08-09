import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <nav className='navbar navbar-expand-lg navbar-light'>
                <div className='collapse navbar-collapse' id='navbarTogglerDemo02'>
                    <ul className='navbar-nav mr-auto mt-2 mt-md-0'>
                        <li className='nav-item'>
                            <NavLink exact to='/'>List Mult Sig Wallents</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink to='/add'>Add Mult Sig Wallet</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>

        );
    }
}

export default Header;
