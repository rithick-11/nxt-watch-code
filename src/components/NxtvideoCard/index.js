import {Link} from 'react-router-dom'

const NxtvideoCard = props => {
  const {data} = props
  const {publishedAt, thumbnailUrl, title, viewCount, channel, id} = data
  const {name, profileImageUrl} = channel
  return (
    <Link to={`/videos/${id}`}>
      <li>
        <img src={thumbnailUrl} className="w-full" alt="video thumbnail" />
        <div className="flex items-start gap-2 mt-3">
          <img src={profileImageUrl} className="h-8" alt="channel logo" />
          <div>
            <p>{title}</p>
            <p>{name}</p>
            <div className="flex items-center gap-2">
              <p>{viewCount}</p>
              <p>{publishedAt}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default NxtvideoCard
