import {Component} from 'react'
import {FaFire} from 'react-icons/fa'

import Layout from '../../components/Layout'
import SavedVideoCard from '../../components/SavedVideoCard'

import NxtWatchContext from '../../contexts/NxtWatchContext'

class SavedVideos extends Component {
  renderNoSavedVideoView = () => (
    <div className="flex flex-col items-center justify-center h-full gap-3">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
        className="h-[40vh]"
      />
      <h1>No saved videos found</h1>
      <p>You can save your videos while watching them</p>
    </div>
  )

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {saveList} = value

          console.log(saveList)

          return (
            <Layout>
              {saveList.length === 0 ? (
                this.renderNoSavedVideoView()
              ) : (
                <>
                  <div className="flex items-center gap-3 p-4 text-xl font-bold">
                    <FaFire className="text-[#FF031C]" />
                    <h1>Saved Videos</h1>
                  </div>
                  <ul className="flex flex-col gap-3 px-3">
                    {saveList.map(each => (
                      <SavedVideoCard key={each.id} data={each} />
                    ))}
                  </ul>
                </>
              )}
            </Layout>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default SavedVideos
