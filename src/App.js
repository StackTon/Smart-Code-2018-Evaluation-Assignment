import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import AddMultWallet from './components/AddMultWallet/AddMultWalletPage';
import ListAllMultWallets from './components/ListAllMultWallets/ListAllMultWalletsPage';
import Header from './components/common/Header';
import './App.css';

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path='/' component={ListAllMultWallets} />
          <Route exact path='/add' component={AddMultWallet} />
        </Switch>
      </div>
    )
  }
}

export default App
