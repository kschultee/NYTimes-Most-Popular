/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'

class APInput extends React.Component {
  render() {
    return (
      <div className="input-group">
        <span className="input-group-label primary">API Key:</span>
        <input className="input-group-field" type="text" placeholder='API Key here...' onChange={this.props.handleChange}></input>
        <div className="input-group-button">
          <input type="submit" className="button" onClick={this.props.handleSubmit}></input>
        </div>
      </div>
    )
  }
}

export default APInput
