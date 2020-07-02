import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Data from '../src/components/Data'

class App extends React. Component{

    render(){
        return(
            <Data/>
        )
    }
} 

ReactDOM.render(<App />, document.getElementById('root'))