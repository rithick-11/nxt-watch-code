import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaSearch} from 'react-icons/fa'
import Layout from '../../components/Layout'
import Banner from '../../components/Banner'
import FailureView from '../../components/FailureView'
import NxtvideoCard from '../../components/NxtvideoCard'

const fetchStateConst = {
  init: 'initial',
  loading: 'loading',
  success: 'success',
  noResulr: 'noResult',
}

class Home extends Component {
  state = {
    searchInput: '',
    fetchState: fetchStateConst.init,
    videos: [],
    showBanner: true,
  }

  componentDidMount = () => {
    this.getVideo()
  }

  convertChannelData = channel => ({
    name: channel.name,
    profileImageUrl: channel.profile_image_url,
  })

  dataConverter = video => ({
    channel: this.convertChannelData(video.channel),
    id: video.id,
    publishedAt: video.published_at,
    viewCount: video.view_count,
    thumbnailUrl: video.thumbnail_url,
    title: video.title,
  })

  getVideo = async () => {
    const {searchInput} = this.state
    this.setState({fetchState: fetchStateConst.loading})
    const homeVideosApiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    try {
      const res = await fetch(homeVideosApiUrl, option)
      const data = await res.json()
      const {videos, total} = data
      if (res.status === 200) {
        const filterData = videos.map(each => this.dataConverter(each))
        this.setState({
          fetchState: fetchStateConst.success,
          videos: filterData,
        })
      }
      if (total === 0) {
        this.setState({fetchState: fetchStateConst.noResulr})
      }
    } catch (err) {
      console.log(err)
    }
  }

  renderSearchBox = () => {
    const {searchInput} = this.state
    return (
      <div className="border-[#424242] border-2 flex items-center rounded-md self-start">
        <input
          type="search"
          className="bg-transparent px-3 py-1 outline-none"
          placeholder="Search"
          value={searchInput}
          onChange={e => {
            this.setState({searchInput: e.target.value})
          }}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="px-4 py-1 outline-none"
          onClick={this.getVideo}
        >
          <FaSearch />{' '}
        </button>
      </div>
    )
  }

  renderLoader = () => (
    <div
      className="loader-container  h-[90vh] flex items-center justify-center"
      data-testid="loader"
    >
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderVideosList = () => {
    const {videos} = this.state
    return (
      <ul className="grid grid-cols-1 sm:md:grid-cols-2 md:grid-cols-3 gap-3">
        {videos.map(each => (
          <NxtvideoCard key={each.id} data={each} />
        ))}
      </ul>
    )
  }

  renderVideos = () => {
    const {fetchState} = this.state

    switch (fetchState) {
      case fetchStateConst.loading:
        return this.renderLoader()

      case fetchStateConst.success:
        return this.renderVideosList()

      case fetchStateConst.noResulr:
        return this.renderNoVideos()

      default:
        return <FailureView retry={this.getVideo} />
    }
  }

  hideBanner = () => {
    this.setState({showBanner: false})
  }

  retryVideos = () => {
    this.setState({searchInput: ''}, () => {
      this.getVideo()
    })
  }

  renderNoVideos = () => (
    <div className="flex items-center justify-center h-full w-full">
      <div className="w-fit mx-auto py-16">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
          className="h-[30vh]"
        />
        <h1>No Search results found</h1>
        <p>Try different key words or remove search filter</p>
        <button
          type="button"
          onClick={this.retryVideos}
          className="px-3 py-1 bg-[#4f46e5] text-white font-medium rounded-md"
        >
          Retry
        </button>
      </div>
    </div>
  )

  render() {
    const {showBanner} = this.state
    return (
      <Layout>
        <div className="p-3  flex flex-col gap-3" data-testid="home">
          {showBanner && <Banner close={this.hideBanner} />}
          {this.renderSearchBox()}
          {this.renderVideos()}
        </div>
      </Layout>
    )
  }
}

export default Home
