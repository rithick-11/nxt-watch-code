import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'

import Layout from '../../components/Layout'

import NxtWatchContext from '../../contexts/NxtWatchContext'

const fetchStateConst = {
  init: 'initial',
  loading: 'loading',
  success: 'success',
  noResulr: 'noResult',
  fail: 'fail',
}

class NxtVideoDetial extends Component {
  state = {
    fetchStatus: fetchStateConst.init,
    videoData: {},
    like: false,
    dislike: false,
  }

  componentDidMount() {
    this.getVideoDetail()
  }

  convertData = data => ({
    channel: {
      name: data.channel.name,
      profileImageUrl: data.channel.profile_image_url,
      subscriberCount: data.channel.subscriber_count,
    },
    description: data.description,
    id: data.id,
    publishedAt: data.published_at,
    thumbnailUrl: data.thumbnail_url,
    title: data.title,
    videoUrl: data.video_url,
    viewCount: data.view_count,
  })

  getVideoDetail = async () => {
    this.setState({fetchStatus: fetchStateConst.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const videoDetailsApiUrl = `https://apis.ccbp.in/videos/${id}`
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    try {
      const res = await fetch(videoDetailsApiUrl, option)
      const data = await res.json()
      const formatedData = this.convertData(data.video_details)
      if (res.status === 200) {
        this.setState({
          videoData: formatedData,
          fetchStatus: fetchStateConst.success,
        })
      } else {
        this.setState({fetchStatus: fetchStateConst.fail})
      }
    } catch (err) {
      console.log(err)
    }
  }

  renderLoader = () => (
    <div
      className="loader-container flex justify-center h-full items-center"
      data-testid="loader"
    >
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderVideo = () => {
    const {videoData, like, dislike} = this.state

    const {channel, description, publishedAt, title, videoUrl, viewCount} =
      videoData

    const {name, profileImageUrl, subscriberCount} = channel

    return (
      <div className="p-3 flex flex-col items-start gap-3">
        <div className="w-full">
          <ReactPlayer url={videoUrl} width="100%" />
        </div>
        <p>{title}</p>
        <div className="flex items-center gap-3">
          <p>{viewCount} views</p>
          <p>{publishedAt}</p>
        </div>
        <NxtWatchContext.Consumer>
          {value => {
            const {setSaveList, saveList} = value
            const isPresent = saveList.some(each => each.id === videoData.id)
            return (
              <ul className="flex items-center gap-3">
                <li>
                  <button
                    className={`${
                      like ? 'text-[#2563eb]' : 'text-[#64748b]'
                    } flex items-center gap-1`}
                    onClick={() => {
                      this.setState(pre => ({like: !pre.like, dislike: false}))
                    }}
                  >
                    <AiOutlineLike />
                    Like
                  </button>
                </li>
                <li>
                  <button
                    className={`${
                      dislike ? 'text-[#2563eb]' : 'text-[#64748b]'
                    } flex items-center gap-1`}
                    onClick={() => {
                      this.setState(pre => ({
                        like: false,
                        dislike: !pre.dislike,
                      }))
                    }}
                  >
                    <AiOutlineDislike />
                    Dislike
                  </button>
                </li>
                <li>
                  <button
                    className={`${
                      isPresent && 'text-[#2563eb]'
                    } flex items-center gap-1`}
                    onClick={() => {
                      setSaveList(videoData)
                    }}
                  >
                    <MdPlaylistAdd />
                    Save
                  </button>
                </li>
              </ul>
            )
          }}
        </NxtWatchContext.Consumer>
        <hr />
        <div className="flex items-start gap-3">
          <img src={profileImageUrl} className="h-12" alt="channel logo" />
          <div className="flex flex-col gap-1">
            <p>{name}</p>
            <p>{subscriberCount} subscribers</p>
          </div>
        </div>
        <p>{description}</p>
      </div>
    )
  }

  renderFailView = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {dark} = value
        return (
          <div>
            <img
              src={
                dark
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
              }
              alt="laksdl"
            />
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderVideoDetial = () => {
    const {fetchStatus} = this.state

    switch (fetchStatus) {
      case fetchStateConst.loading:
        return this.renderLoader()

      case fetchStateConst.success:
        return this.renderVideo()

      case fetchStateConst.fail:
        return this.renderFailView()

      default:
        return null
    }
  }

  render() {
    return (
      <Layout>
        <div className="h-full">{this.renderVideoDetial()}</div>
      </Layout>
    )
  }
}

export default NxtVideoDetial
