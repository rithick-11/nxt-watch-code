import NxtWatchContext from '../../contexts/NxtWatchContext'

const FailureView = ({retry}) => (
  <NxtWatchContext.Consumer>
    {value => {
      const {dark} = value
      const imgUrl = dark
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
      return (
        <div>
          <img src={imgUrl} alt="failure view" />
          <h1>Oops! Something Went Wrong</h1>
          <p>
            We are having some trouble to complete your request. Please try
            again.
          </p>
          <button
            type="button"
            onClick={() => {
              retry()
            }}
          >
            Retry
          </button>
        </div>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default FailureView
