import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {FaFire} from 'react-icons/fa'

import NxtvideoCard from '../../components/NxtvideoCard'
import Layout from '../../components/Layout'
import FailureView from '../../components/FailureView'

import NxtWatchContext from '../../contexts/NxtWatchContext'

const apiStatusConst = {
  init: 'INIT',
  loading: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAIL',
}

class Trending extends Component {
  state = {apiStatus: apiStatusConst.init, trendingVideosList: []}

  componentDidMount() {
    this.getTrendingVideos()
  }

  dataConverter = video => {
    return {
      channel: {
        name: video.channel.name,
        profileImageUrl: video.channel.profile_image_url,
      },
      id: video.id,
      publishedAt: video.published_at,
      viewCount: video.view_count,
      thumbnailUrl: video.thumbnail_url,
      title: video.title,
    }
  }

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiStatusConst.loading})
    const trendingVideosApiUrl = `https://apis.ccbp.in/videos/trending`
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    const res = await fetch(trendingVideosApiUrl, option)
    const data = await res.json()
    if (res.status === 200) {
      const formatedData = data.videos.map(each => this.dataConverter(each))
      this.setState({
        apiStatus: apiStatusConst.success,
        trendingVideosList: formatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConst.fail})
    }
  }

  renderLoadingView = () => (
    <div
      className="loader-container h-[90vh] flex items-center justify-center"
      data-testid="loader"
    >
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {trendingVideosList} = this.state

    return (
      <>
        <div className="px-5 py-8 flex items-center text-2xl font-bold gap-3 bg">
          <FaFire className="text-[#FF031C]" />
          <h1>Trending</h1>
        </div>
        <ul className="grid grid-cols-1 sm:md:grid-cols-2 md:grid-cols-3 gap-3 px-3">
          {trendingVideosList.map(each => (
            <NxtvideoCard key={each.id} data={each} />
          ))}
        </ul>
      </>
    )
  }

  retryApi = () => {
    this.getTrendingVideos()
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
        <div>{this.renderViews()}</div>
      </Layout>
    )
  }
}

export default Trending
