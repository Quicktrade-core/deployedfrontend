import { FaEye } from "react-icons/fa"
import { video_list } from "../assets/assets"
import { Link } from "react-router"

const Reels = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 py-4">
      {video_list.map(video => (
        // <Link to={`/video/${video._id}`} key={video._id} className="relative w-3/7 h-70 text-white">
        <Link to={`/videos`} key={video._id} className="relative w-3/7 h-70 text-white">
          <img src={video.cover} alt="" className="rounded-2xl w-full h-full object-cover" />
          <span className="bg-neutral-900/50 px-2 absolute top-2 right-2 flex items-center gap-3 rounded-full">
            <FaEye className="" /> 860
          </span>
          <p className="leading-tight p-2 absolute bottom-0">{video.caption}</p>
        </Link>
      ))}
    </div>
  )
}

export default Reels