import React from 'react'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'

import Header from '../../components/Header'

import Home from '../Home'
import Checkout from '../Checkout'
import WalletLink from '../WalletLink'
import SinglePayment from '../SinglePayment'
import PaymentVault from '../PaymentVault'

const App = () => (
    <BrowserRouter>
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/checkout"  component={Checkout} />
          <Route exact path="/wallet-link"  component={WalletLink} />
          <Route exact path="/single-payment"  component={SinglePayment} />
          <Route exact path="/payment-vault"  component={PaymentVault} />
          <Redirect to="/" />
        </Switch>
      </main>
    </BrowserRouter>
)

export default App
