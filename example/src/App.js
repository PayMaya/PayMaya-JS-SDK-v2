import React, { useEffect, useRef } from 'react';
import logo from './logo.svg';
import paymaya from 'paymaya-sdk-ts';
import './App.css';

function App() {
  const ref = useRef(null);
  useEffect( () => {
    // paymaya.init('pk-Z0OSzLvIcOI2UIvDhdTGVVfRSSeiGStnceqwUE7n0Ah', true)
    paymaya.createCreditCardForm()
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p ref={ref}>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
