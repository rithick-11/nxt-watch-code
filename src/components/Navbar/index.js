import {Component} from 'react'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {FiLogOut} from 'react-icons/fi'
import {FaBars} from 'react-icons/fa'

import NavItems from '../NavItems'
import NxtWatchContext from '../../contexts/NxtWatchContext'

class Navbar extends Component {
  logoutUser = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {dark, setDark} = value
          return (
            <nav
              className={`${
                dark ? 'bg-[#212121] text-[#fff]' : 'bg-[#fff] text-[#212121]'
              } flex items-center justify-between h-[10vh] px-3`}
            >
              <Link to="/">
                <img
                  src={
                    dark
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  }
                  className="h-10"
                  alt="website logo"
                />
              </Link>
              <ul className="flex items-center gap-4 text-xl sm:2xl  font-bold">
                <li>
                  <button type="button" data-testid="theme" onClick={setDark}>
                    {dark ? (
                      <i className="bi bi-sun">{''}</i>
                    ) : (
                      <i className="bi bi-moon-fill">{''}</i>
                    )}
                  </button>
                </li>
                <li className="hidden md:block">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                    className="h-7 my-auto"
                  />
                </li>
                <li className="md:hidden">
                  <Popup
                    modal
                    nested
                    trigger={
                      <button>
                        <p>
                          <FaBars />
                          {''}
                        </p>
                      </button>
                    }
                    position="top center"
                  >
                    {close => (
                      <div
                        className={`${
                          dark
                            ? 'bg-[#181818] text-[#f9f9f9]'
                            : 'bg-[#f9f9f9] text-[#181818]'
                        } bg-white h-screen w-screen flex flex-col py-4 px-7 justify-between items-center`}
                      >
                        <button
                          type="button"
                          className="self-end text-2xl"
                          onClick={() => {
                            close()
                          }}
                        >
                          <p>
                            <i className="bi bi-x-lg">{''}</i>
                          </p>
                        </button>
                        <NavItems />
                        <span> </span>
                      </div>
                    )}
                  </Popup>
                </li>
                <li>
                  <Popup
                    modal
                    nested
                    trigger={
                      <button>
                        <FiLogOut className="md:hidden" />
                        <p className="hidden md:block px-2 py-1 border-[#3b82f6] border-[1px] rounded text-[#3b82f6] font-medium">
                          Logout
                        </p>
                      </button>
                    }
                  >
                    {close => (
                      <div
                        className={`${
                          dark
                            ? 'bg-[#181818] text-[#f9f9f9]'
                            : 'bg-[#f9f9f9] text-[#181818]'
                        } px-10 py-8 rounded-md flex flex-col gap-5 items-center`}
                      >
                        <p>Are you sure you want to logout</p>
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            className="px-3 py-1 border-[#7e858e] border-[1px] rounded"
                            onClick={() => {
                              close()
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="px-3 py-1 bg-[#3b82f6] text-white font-medium rounded"
                            onClick={this.logoutUser}
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    )}
                  </Popup>
                </li>
              </ul>
            </nav>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default withRouter(Navbar)
