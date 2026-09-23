// import { useState } from "react"
// import { video_list } from "../assets/assets"
// import VideoPlayer from "../components/videoPlayer"
// import { useNavigate, useParams } from "react-router"
// import { FaAngleLeft, FaArrowLeft } from "react-icons/fa"
// import Scrolltotop from "../components/scrolltotop"

// const VideoPage = () => {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const [muted, setMuted] = useState(true)
//   const video = video_list.find(video => video._id === id)

//   return (
//     <main className="bg-neutral-900 h-screen overflow-y-scroll">
//       <Scrolltotop />
//       <button onClick={() => { navigate(-1) }} className="bg-neutral-900 rounded-full absolute p-2 top-5 left-5 z-10 cursor-pointer">
//         <FaArrowLeft className="text-white text-2xl" />
//       </button>
//       <VideoPlayer src={video.video} videoData={video} muted={muted} setMuted={setMuted} />
//     </main>
//   )
// }

// export default VideoPage