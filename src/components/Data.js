/* eslint-disable multiline-ternary */
import React from 'react'
import '../index.scss'
import { connect } from 'react-redux'
import { AddNumber } from './actions/actions'

class Data extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      min_number: '',
      max_number: '',
      reading_data: '',
      reduxResult: [],
      data: []
    }

    this.sendData = (ev) => {
      ev.preventDefault()

      this.props.AddNumber(this.state.min_number, this.state.max_number)
    }
  }

  render() {
    const history = this.props.data ? (<nav className="container-history">
      <label className="title-history">History</label>
      <div className="container-table">
        <table id="sensorList">
          <thead>
            <tr>
              <th>Number</th>
            </tr>
          </thead>

          {this.props.data.map((reading_result) => <tbody key={reading_result}>
            <tr>
              <td>{reading_result}</td>
            </tr>
          </tbody>)}
        </table>
      </div>
    </nav>) : null
    if (this.props.data === undefined ? false : this.props.data.length >= 10) {
      this.props.data.shift()
    }
    return (
      <div className="main_container" >
        <nav className="container">
          <div className="title-container">
            <label className="title">Random Generator</label>
          </div>
          <form className="container-num-input">
            <input type="text" placeholder="Min" value={this.state.min_number} onChange={(ev) => this.setState({ min_number: ev.target.value })}></input>
            <input type="text" placeholder="Max" value={this.state.max_number} onChange={(ev) => this.setState({ max_number: ev.target.value })}></input>
            <button onClick={this.sendData}>Received Values</button>
          </form>
          <div className="container-received-input">
            <input type="text" placeholder="Received Number" value={this.props.data.result} readOnly></input>
          </div>

        </nav>
        {history}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ data: state.data })

const mapDispatchToProps = (dispatch) => ({ AddNumber: (min, max) => dispatch(AddNumber(min, max)) })

export default connect(mapStateToProps, mapDispatchToProps)(Data)
