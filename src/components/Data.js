import React from 'react'
import '../index.scss'
import io from "socket.io-client"

class Data extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            min_number: '',
            max_number:'',
            reading_data: '',
            data: []
        }

        this.socket = io('localhost:8000', {path:"/test"})
        
        this.sendData = ev => {
            ev.preventDefault();
            this.socket.emit('send_data',{
                min: this.state.min_number,
                max: this.state.max_number
            })
           
        }
    }
    


    componentDidMount()
    {
        this.socket.on('data_generate', (data) =>{
            addResult(data)
        })

        const addResult = dataInformation => {

            this.setState({reading_data:dataInformation})
            const currentData = this.state.data;
            const currentDataReceived = currentData.concat(this.state.reading_data)
            this.setState({data:currentDataReceived}, function(){console.log(this.state.data)})
        }
        
    }


    render(){
        const {data} = this.state;
        return(
            <div class="main_container" >
            <nav className="container">
                <div className="title-container">
                    <label class="title">Random Generator</label>
                </div>
                    <form className="container-num-input">
                            <input type="text" placeholder="Min" value={this.state.min_number} onChange={ev=>this.setState({min_number:ev.target.value})}></input>
                            <input type="text" placeholder="Max" value={this.state.max_number} onChange={ev=>this.setState({max_number:ev.target.value})}></input>
                            <button onClick={this.sendData}>Received Values</button>
                    </form>
                            <div className="container-received-input">
                            <input type="text" placeholder="Received Number" value={this.state.reading_data}></input>
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
                    {data.map(reading_result =>
                    <tbody key={reading_result+reading_result}>
                        <tr>
                            <td>{reading_result}</td>
                        </tr>
                    </tbody>
                    )}
                    </table>
                </div>
            </nav>
            </div>
        )
    }
}
export default Data;