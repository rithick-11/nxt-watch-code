const GameCard = props => {
  const {data} = props
  const {thumbnailUrl, title, viewCount} = data
  return (
    <li className="flex flex-col items-center justify-center">
      <img
        src={thumbnailUrl}
        alt="video thumbnail"
        className="h-[240px] md:h-auto"
      />
      <p className="font-bold text-md mt-3">{title}</p>
      <p className="text-sm">{viewCount}</p>
    </li>
  )
}

export default GameCard
