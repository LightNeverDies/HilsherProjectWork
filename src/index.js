import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

class App extends React. Component{


    render(){
        return(
            <div class="main_container" >
            <nav className="container">
                <div className="title-container">
                    <label class="title">Random Generator</label>
                </div>
                    <form className="container-num-input">
                            <input type="text" placeholder="Min"></input>
                            <input type="text" placeholder="Max"></input>
                    </form>
                            <div className="container-received-input">
                                <input type="text" placeholder="Received Number"></input>
                            </div>

            </nav>
            <nav className="container-history">
                <label className="title-history">History</label>
                <div className="container-table">
                        <table id="sensorList">
                    <thead>
                        <tr>
                        <th>Number</th>
                        </tr>
                    </thead>
                    <tbody key= "none">
                        <tr>
                        <td>HardCoded</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </nav>
            </div>
        )
    }
} 

ReactDOM.render(<App />, document.getElementById('root'))