import './index.css'
import {BannerCard} from '../StyledComponents'

const Banner = ({close}) => (
  <BannerCard
    className="px-4 py-6 flex flex-col gap-3 bg-banner rounded-md text-black"
    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png"
    data-testid="banner"
  >
    <div className="flex items-center justify-between">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        className="h-7"
        alt="nxt watch logo"
      />
      <button
        type="button"
        data-testid="close"
        onClick={() => {
          close()
        }}
      >
        <p>
          <i className="bi bi-x-lg">{''}</i>
        </p>
      </button>
    </div>
    <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
    <button className="self-start">GET IT NOW</button>
  </BannerCard>
)

export default Banner
