import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import Data from './components/Data'
import DataAdded from './components/reducers/DataAdded'

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (e) {
    //console.log(e);
  }
}
const loggerMiddleware = createLogger()

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch (e) {
    // console.log(e);
    return undefined
  }
}

const persistedState = loadFromLocalStorage()

const store = createStore(
  DataAdded,
  persistedState,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

store.subscribe(() => saveToLocalStorage(store.getState()))

class App extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Data/>
    )
  }
}
export default App

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
