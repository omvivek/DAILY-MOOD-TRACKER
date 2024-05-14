import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', checkBox: '', errorMessage: ''}

  callusername = event => {
    this.setState({username: event.target.value})
  }

  callpassword = event => {
    this.setState({password: event.target.value})
  }

  callcheckbox = event => {
    this.setState({checkBox: event.target.checked})
  }

  callsubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const {history} = this.props

      Cookies.set('jwt_token', data.jwt_token, {
        expires: 30,
        path: '/',
      })
      history.replace('/')
    } else {
      this.setState({errorMessage: data.error_msg})
    }
  }

  render() {
    const {username, password, checkBox, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-back">
        <div className="main-back-box">
          <h1 className="main-back-box-h1">Daily Mood Tracker</h1>
          <form onSubmit={this.callsubmit}>
            <label className="main-back-box-label" htmlFor="Username">
              USERNAME
            </label>
            <br />
            <input
              className="main-back-box-input"
              type="text"
              value={username}
              onChange={this.callusername}
              placeholder="Username"
              id="Username"
              autoComplete="username"
            />
            <br />
            <label className="main-back-box-label" htmlFor="Password">
              PASSWORD
            </label>
            <br />
            <input
              className="main-back-box-input"
              type={checkBox ? 'text' : 'password'}
              value={password}
              onChange={this.callpassword}
              placeholder="Password"
              id="Password"
            />
            <br />
            <input onChange={this.callcheckbox} type="checkbox" id="Checkbox" />
            <label className="main-back-box-showpassword" htmlFor="Checkbox">
              Show Password
            </label>
            <br />
            <button className="main-back-box-login" type="submit">
              Login
            </button>
            <p className="main-back-box-errorMessage">{errorMessage}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
