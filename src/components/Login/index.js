import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {userid: '', pin: '', fetchFail: false, errorMsg: ''}

  changeUserName = e => {
    this.setState({userid: e.target.value})
  }

  changeUserPIN = e => {
    this.setState({pin: e.target.value})
  }

  submitForm = async e => {
    e.preventDefault()
    const {userid, pin} = this.state

    const userDetails = {userid, pin}
    console.log(userDetails)
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/ebank/login', options)
    const data = await response.json()
    if (response.ok) {
      const {history} = this.props
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      history.replace('/')
    } else {
      this.setState({fetchFail: true, errorMsg: data.error_msg})
    }
  }

  render() {
    const {fetchFail, errorMsg} = this.state
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="Login_container">
        <div className="sub_container">
          <div className="img_container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="login_image"
            />
          </div>
          <form className="form_container" onSubmit={this.submitForm}>
            <h1>Welcome Back!</h1>
            <label htmlFor="name">User ID</label>
            <input type="text" id="name" onChange={this.changeUserName} />
            <label htmlFor="pin">PIN</label>
            <input type="password" id="pin" onChange={this.changeUserPIN} />
            <button type="submit">Login</button>
            {fetchFail && <p>{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
