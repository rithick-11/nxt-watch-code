import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import NxtWatchContext from '../../contexts/NxtWatchContext'

class Login extends Component {
  state = {usename: '', password: '', showPassword: false, errMsg: ''}

  onSubmitForm = async e => {
    e.preventDefault()
    const {usename, password, errMsg} = this.state
    const {history} = this.props
    const url = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify({username: usename, password}),
    }
    try {
      const res = await fetch(url, option)
      const data = await res.json()
      if (res.status === 200) {
        this.setState({errMsg: '', usename: '', password: ''})
        Cookies.set('jwt_token', data.jwt_token, {expires: 2})
        history.replace('/')
      } else if (res.status === 400) {
        this.setState({errMsg: data.error_msg})
      }
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const {showPassword, usename, password, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <NxtWatchContext.Consumer>
        {context => {
          const {dark} = context
          return (
            <section
              className={`${
                dark
                  ? 'bg-[#181818] text-[#f9f9f9]'
                  : 'bg-[#f9f9f9] text-[#181818]'
              } min-h-screen flex justify-center items-center`}
            >
              <div className="bg-white px-14 py-6 rounded-xl shadow">
                <img
                  src={
                    dark
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  }
                  className="h-10 mx-auto my-4"
                  alt="nxt watch logo"
                />
                <form
                  className="flex flex-col mt-5 gap-3"
                  onSubmit={this.onSubmitForm}
                >
                  <div className="flex flex-col gap-1 text-[#94a3b8]">
                    <label htmlFor="username" className="font-bold">
                      USERNAME
                    </label>
                    <input
                      type="text"
                      placeholder="Username"
                      id="username"
                      className="px-2 py-1 border-[1px] rounded border-[#94a3b8]"
                      value={usename}
                      onChange={e => {
                        this.setState({usename: e.target.value})
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 text-[#94a3b8]">
                    <label htmlFor="password" className="font-bold">
                      PASSWORD
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      id="password"
                      className="px-2 py-1 border-[1px] rounded border-[#94a3b8]"
                      value={password}
                      onChange={e => {
                        this.setState({password: e.target.value})
                      }}
                    />
                  </div>
                  <div className="flex gap-1">
                    <input
                      type="checkbox"
                      id="showPassword"
                      className="px-2 py-1 border-[1px] rounded border-[#94a3b8]"
                      onClick={() => {
                        this.setState(pre => ({
                          showPassword: !pre.showPassword,
                        }))
                      }}
                    />
                    <label htmlFor="showPassword">Show Password</label>
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      className="px-2 py-1 bg-[#3b82f6] text-white text-md font-medium rounded"
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      className="text-blue shadow shadow-[#3b82f6] px-2 py-1 rounded-md"
                      onClick={() => {
                        this.setState({
                          usename: 'rahul',
                          password: 'rahul@2021',
                        })
                      }}
                    >
                      Demo user
                    </button>
                  </div>
                </form>
                {errMsg !== '' && (
                  <p className="text-[#ff0000] my-2">*{errMsg}</p>
                )}
              </div>
            </section>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Login
