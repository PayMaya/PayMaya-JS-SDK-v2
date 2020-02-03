import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => (
    <header>
        <img src="/img/paymaya.png" alt="PayMaya" />
        <NavLink activeClassName='active' exact={true} to="/">Home</NavLink>
        <NavLink activeClassName='active' to="/checkout">Checkout</NavLink>
        <NavLink activeClassName='active' to="/wallet-link">WalletLink</NavLink>
        <NavLink activeClassName='active' to="/single-payment">Single payment</NavLink>
        <NavLink activeClassName='active' to="/payment-vault">Payment Vault</NavLink>
    </header>
)

export default Header