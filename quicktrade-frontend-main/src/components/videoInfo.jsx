const VideoInfo = ({ video }) => {
  return (
    <div className="w-5/6 absolute left-5 bottom-5 flex flex-col gap-2 z-10">
      <div className="flex items-center gap-3">
        <img src={video.image} alt={video.name} className="w-8" />
        <p className="text-white font-bold">@{video.name}</p>
      </div>
      <p className="text-white leading-tight">{video.caption}</p>
    </div>
  )
}

export default VideoInfo