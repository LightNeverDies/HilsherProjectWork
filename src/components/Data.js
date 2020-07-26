import React from 'react'
import '../index.scss'
import io from "socket.io-client"
import {connect} from "react-redux"
import {AddNumber} from "../components/actions/actions"

class Data extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            min_number: '',
            max_number:'',
            reading_data: '',
            reduxResult: [],
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
            
            const currentData = this.props.data ? this.props.data: [];
            console.log(currentData)
            const currentDataReceived = currentData.concat(this.state.reading_data)
            this.setState({data:currentDataReceived})

            this.state.reduxResult = this.props.AddNumber(currentDataReceived);
            console.log(this.state.reduxResult)
            
        }


    }

    render(){
        const history = this.props.data ? (<nav className="container-history">
        <label className="title-history">History</label>
        <div className="container-table">
                <table id="sensorList">
            <thead>
                <tr>
                <th>Number</th>
                </tr>
            </thead>
            
            {this.props.data.map(reading_result =>
           <tbody key={reading_result.id}>
                <tr>
                    <td>{reading_result.result}</td>
                </tr>
            </tbody>
            )}
            </table>
        </div>
    </nav>) : null
        if(this.props.data == undefined ?false :  this.props.data.length >= 10 ) {this.props.data.shift()}
        return(
            <div className="main_container" >
            <nav className="container">
                <div className="title-container">
                    <label className="title">Random Generator</label>
                </div>
                    <form className="container-num-input">
                            <input type="text" placeholder="Min" value={this.state.min_number} onChange={ev=>this.setState({min_number:ev.target.value})}></input>
                            <input type="text" placeholder="Max" value={this.state.max_number} onChange={ev=>this.setState({max_number:ev.target.value})}></input>
                            <button onClick={this.sendData}>Received Values</button>
                    </form>
                            <div className="container-received-input">
                            <input type="text" placeholder="Received Number" value={this.state.reading_data.result} readOnly></input>
                            </div>
                            
            </nav>
                {history}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {data : state.data}
}

const mapDispatchToProps = dispatch =>{
    return {AddNumber:data => dispatch(AddNumber(data))}
}

export default connect(mapStateToProps,mapDispatchToProps)(Data);
