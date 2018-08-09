import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import AddMultWallet from './components/AddMultWallet/AddMultWalletPage'
import ListAllMultWallets from './components/ListAllMultWallets/ListAllMultWalletsPage'
import Header from './components/common/Header'
import SetNamesToWalletAddresses from './components/SetNamesToWalletAddresses/SetNamesToWalletAddressesPage'
import './App.css'
import Footer from './components/common/Footer'
import PageNotFound from './components/common/PageNotFound';

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path='/' component={ListAllMultWallets} />
          <Route path='/add' component={AddMultWallet} />
          <Route path='/wallet/:walletAddress' component={SetNamesToWalletAddresses} />
          <Route path='*' component={PageNotFound} />
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default App
