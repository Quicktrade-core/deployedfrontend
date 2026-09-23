import { useState } from "react"
import { FaComment, FaHeart, FaShare } from "react-icons/fa"

const VideoActions = ({ video }) => {
  const [like, setLike] = useState(false)
  const style = `bg-none border-none text-white flex flex-col items-center cursor-pointer`

  return (
    <div className="absolute right-5 bottom-40 flex flex-col gap-5 z-10">
      <button onClick={() => { setLike(previous => !previous) }} className={`${style}`}>
        {like ? <FaHeart className="text-red-600" /> : <FaHeart />}
        <span>{like ? Number(video.likes) + 1 : video.likes}</span>
      </button>
      <button className={`${style}`}>
        <FaComment />
        <span>{video.comments}</span>
      </button>
      <button className={`${style}`}>
        <FaShare />
        <span>Share</span>
      </button>
    </div>
  )
}

export default VideoActions