import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Data from '../src/components/Data'
import {createStore} from "redux"
import {Provider} from "react-redux"
import DataAdded from "../src/components/reducers/DataAdded"



function saveToLocalStorage (state){
    try{
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    }
    catch(e){
        console.log(e)
    }
}

function loadFromLocalStorage (){
    try{
        const serializedState = localStorage.getItem('state')
        if(serializedState === null) return undefined
        return JSON.parse(serializedState)
    }
    catch(e){
        console.log(e)
        return undefined
    }
}

const persistedState = loadFromLocalStorage()

const store = createStore(
    DataAdded,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )


store.subscribe(() => saveToLocalStorage(store.getState()))


class App extends React.Component{
    render(){
        return(
            <Data/>
        )
    }
}
export default App;

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>, 
document.getElementById('root'))
