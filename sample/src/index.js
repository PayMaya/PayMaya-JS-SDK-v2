import React, {Fragment} from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import store, { history } from './store'
import App from './containers/App'

import 'sanitize.css/sanitize.css'
import './index.css'

const root = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  root
)
