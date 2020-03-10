import React from 'react'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'

import Header from '../../components/Header'

import Home from '../Home'
import Checkout from '../Checkout'
import SinglePayment from '../SinglePayment'
import WalletLink from '../WalletLink'
import CreditCard from '../CreditCard'
import Success from '../Success'
import Failure from '../Failure'
import Cancel from '../Cancel'

const App = () => (
    <BrowserRouter>
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/checkout"  component={Checkout} />
          <Route exact path="/single-payment"  component={SinglePayment} />
          <Route exact path="/wallet-link"  component={WalletLink} />
          <Route exact path="/credit-card"  component={CreditCard} />
          <Route exact path="/success"  component={Success} />
          <Route exact path="/failure"  component={Failure} />
          <Route exact path="/cancel"  component={Cancel} />
          <Redirect to="/" />
        </Switch>
      </main>
    </BrowserRouter>
)

export default App
