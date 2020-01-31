import React, { Fragment } from 'react'
import { Route, NavLink } from 'react-router-dom'
import Home from '../Home'
import Checkout from '../Checkout'
import WalletLink from '../WalletLink'
import SinglePayment from '../SinglePayment'
import PaymentVault from '../PaymentVault'

const App = () => (
  <Fragment>
    <header>
      <img src="/img/paymaya.png" alt="PayMaya" />
      <NavLink activeClassName='active' exact={true} to="/">Home</NavLink>
      <NavLink activeClassName='active' to="/checkout">Checkout</NavLink>
      <NavLink activeClassName='active' to="/wallet-link">WalletLink</NavLink>
      <NavLink activeClassName='active' to="/single-payment">Single payment</NavLink>
      <NavLink activeClassName='active' to="/payment-vault">Payment Vault</NavLink>
    </header>
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/checkout"  component={Checkout} />
      <Route exact path="/wallet-link"  component={WalletLink} />
      <Route exact path="/single-payment"  component={SinglePayment} />
      <Route exact path="/payment-vault"  component={PaymentVault} />
    </main>
  </Fragment>
)

export default App
