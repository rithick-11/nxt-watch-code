import Layout from '../../components/Layout'

import NxtWatchContext from '../../contexts/NxtWatchContext'

const NotFound = () => (
  <Layout>
    <NxtWatchContext.Consumer>
      {value => {
        const {dark} = value
        const imgUrl = dark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
        return (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <img src={imgUrl} alt="not found" className="h-[45vh]" />
            <h1 className="text-xl font-medium">Page Not Found</h1>
            <p>we are sorry, the page you requested could not be found.</p>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  </Layout>
)

export default NotFound
