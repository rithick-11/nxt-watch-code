import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'

import Layout from '../../components/Layout'
import GameCard from '../../components/GameCard'
import FailureView from '../../components/FailureView'

const apiStatusConst = {
  init: 'INIT',
  loading: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAIL',
}

class Gaming extends Component {
  state = {apiStatus: apiStatusConst.init, gamesList: []}

  componentDidMount() {
    this.getGames()
  }

  dataConverter = video => ({
    id: video.id,
    viewCount: video.view_count,
    thumbnailUrl: video.thumbnail_url,
    title: video.title,
  })

  getGames = async () => {
    this.setState({apiStatus: apiStatusConst.loading})
    const getGameUrl = `https://apis.ccbp.in/videos/gaming`
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    const res = await fetch(getGameUrl, option)
    const data = await res.json()
    if (res.status === 200) {
      const formatedData = data.videos.map(each => this.dataConverter(each))
      this.setState({
        apiStatus: apiStatusConst.success,
        gamesList: formatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConst.fail})
    }
  }

  renderLoadingView = () => (
    <div
      className='loader-container  h-[90vh] flex items-center justify-center'
      data-testid='loader'
    >
      <Loader type='ThreeDots' color='#ffffff' height='50' width='50' />
    </div>
  )

  renderSuccessView = () => {
    const {gamesList} = this.state

    return (
      <>
        <div className='px-5 py-8 flex items-center text-2xl font-bold gap-3 bg'>
          <SiYoutubegaming className='text-[#FF031C]' />
          <h1>Gaming</h1>
        </div>
        <ul className='grid grid-cols-1 grid-cols-2 md:grid-cols-3 gap-5 px-3 justify-center items-center'>
          {gamesList.map(each => (
            <GameCard key={each.id} data={each} />
          ))}
        </ul>
      </>
    )
  }

  renderViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConst.loading:
        return this.renderLoadingView()

      case apiStatusConst.success:
        return this.renderSuccessView()

      case apiStatusConst.fail:
        return <FailureView retry={this.retryApi} />

      default:
        return null
    }
  }

  render() {
    return (
      <Layout>
        <>{this.renderViews()}</>
      </Layout>
    )
  }
}

export default Gaming
