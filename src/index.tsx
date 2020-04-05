import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

function render() {
  const App = require('./components/App').default;
  (window as any)['store'] = store;
  ReactDOM.render(
    <Provider store={ store }>
      <App/>
    </Provider>,
    document.getElementById('root')
  )
}

render();

if (process.env.NODE_ENV === 'development') {
  (module as any).hot?.accept('./App', render)
}
