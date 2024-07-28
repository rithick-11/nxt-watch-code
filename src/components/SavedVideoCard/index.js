import {Link} from 'react-router-dom'

const SavedVideoCard = props => {
  const {data} = props
  const {publishedAt, thumbnailUrl, title, viewCount, channel, id} = data
  const {name, profileImageUrl} = channel

  return (
    <li>
      <Link to={`/videos/${id}`} className="grid grid-cols-7 gap-3">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="col-span-3 md:col-span-2"
        />
        <div className="col-span-4 md:col-span-5">
          <p className="text-md">{title}</p>
          <p className="text-sm">{name}</p>
          <div className="flex items-center gap-3">
            <p>{viewCount} views</p>
            <p>{publishedAt}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default SavedVideoCard
