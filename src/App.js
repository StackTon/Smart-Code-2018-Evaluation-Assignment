import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AddMultWallet from './components/AddMultWallet/AddMultWalletPage';
import ListAllMultWallets from './components/ListAllMultWallets/ListAllMultWalletsPage';
import Header from './components/common/Header';
import SetNamesToWalletAddresses from './components/SetNamesToWalletAddresses/SetNamesToWalletAddressesPage';
import './App.css';




class App extends Component {
  render () {
    return (
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path='/' component={ListAllMultWallets} />
          <Route path='/add' component={AddMultWallet} />
          <Route path='/wallet/:walletAddress' component={SetNamesToWalletAddresses} />
        </Switch>
      </div>
    )
  }
}

export default App
