import {Link, withRouter} from 'react-router-dom'
import {MdHome} from 'react-icons/md'
import {FaFire} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {RiMenuAddFill} from 'react-icons/ri'

const NavItems = props => {
  const {match} = props
  const {path} = match
  const active = 'text-[#ff0000] font-bold'
  return (
    <ul className="flex flex-col items-start gap-3">
      <li className={``}>
        <Link to="/" className="flex items-center gap-2 text-xl">
          <MdHome className={`${path === '/' && active} text-2xl`} />
          <p>Home</p>
        </Link>
      </li>
      <li>
        <Link to="/trending" className="flex items-center gap-2 text-xl">
          <FaFire className={`${path === '/trending' && active} text-2xl`} />
          <p>Trending</p>
        </Link>
      </li>
      <li>
        <Link to="/gaming" className="flex items-center gap-2 text-xl">
          <SiYoutubegaming
            className={`${path === '/gaming' && active} text-2xl`}
          />
          <p>Gaming</p>
        </Link>
      </li>
      <li>
        <Link to="/saved-videos" className="flex items-center gap-2 text-xl">
          <RiMenuAddFill
            className={`${path === '/saved-videos' && active} text-2xl`}
          />
          <p>Saved videos</p>
        </Link>
      </li>
    </ul>
  )
}

export default withRouter(NavItems)
