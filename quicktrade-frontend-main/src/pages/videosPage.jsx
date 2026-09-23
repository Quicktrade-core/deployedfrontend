//import { useEffect, useRef, useState } from "react";
// import VideoCard from "../../components/video/VideoCard";

import { useState } from "react"
import { video_list } from "../assets/assets"
import VideoActions from "../components/videoActions"
import VideoInfo from "../components/videoInfo"
import VideoPlayer from "../components/videoPlayer"
import { Link, useNavigate } from "react-router"

import { FaAngleLeft, FaArrowLeft } from "react-icons/fa"
import Scrolltotop from "../components/scrolltotop"

const VideosPage = () => {
  const navigate = useNavigate()
  const [muted, setMuted] = useState(true)

  return (
    <main className="bg-neutral-900 h-screen overflow-y-scroll snap-y snap-mandatory">
      <Scrolltotop />
      <button onClick={() => { navigate(-1) }} className="bg-neutral-900/30 rounded-full absolute p-2 top-5 left-5 z-10 cursor-pointer">
        <FaArrowLeft className="text-white text-2xl" />
      </button>
      {video_list.map((video) => (
        <article key={video._id} className="relative h-screen overflow-hidden snap-start">
          <VideoPlayer src={video.video} videoData={video} muted={muted} setMuted={setMuted} />
          {/* <VideoActions video={video} /> */}
          {/* <VideoInfo video={video} /> */}
        </article>
      ))}
      {/* <div ref={loadMoreRef} /> */}
    </main>
  )
}

export default VideosPage

//const VideosPage = () => {
//   const [videos, setVideos] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const loadMoreRef = useRef(null);

//   useEffect(() => {
//     async function fetchVideos() {
//       try {
//         setLoading(true);

//         const response = await fetch(
//           `/api/videos?page=${page}&limit=10`
//         );

//         const data = await response.json();

//         setVideos((previous) => [
//           ...previous,
//           ...data.videos,
//         ]);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchVideos();
//   }, [page]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) {
//           setPage((prev) => prev + 1);
//         }
//       },
//       {
//         threshold: 0.1,
//       }
//     );

//     if (loadMoreRef.current) {
//       observer.observe(loadMoreRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <main className="video-feed">
//         sample
//       {/* {loading && <p>Loading...</p>}

//       {videos.map((video) => (
//         <VideoCard
//           key={video._id}
//           video={video}
//         />
//       ))}

//       <div ref={loadMoreRef} /> */}
//     </main>
//   )
// }

// export default VideosPage





// import VideoPlayer from "./VideoPlayer";
// import VideoActions from "./VideoActions";
// import VideoInfo from "./VideoInfo";

// export default function VideoCard({ video }) {
//   return (
//     <article className="video-card">

//       <VideoPlayer
//         src={video.videoUrl}
//       />

//       <VideoActions
//         video={video}
//       />

//       <VideoInfo
//         video={video}
//       />

//     </article>
//   );
// }





// import { useEffect, useRef, useState } from "react";

// export default function VideoPlayer({ src }) {
//   const videoRef = useRef(null);
//   const [muted, setMuted] = useState(true);
  
//   const video = videoRef.current;

//   const toggleMute = () => {
//     video.muted = !video.muted;
//     setMuted(video.muted);
//   };

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           video.play().catch(() => {});
//         } else {
//           video.pause();
//         }
//       },
//       {
//         threshold: 0.7,
//       }
//     );

//     observer.observe(video);

//     return () => {
//       observer.disconnect();
//     };
//   }, []);

//   return (
//     <div className="video-player">

//       <video
//         ref={videoRef}
//         src={src}
//         muted={muted}
//         loop
//         playsInline
//         preload="metadata"
//         className="video"
//       />

//       <button onClick={toggleMute}>
//         {muted ? "🔇" : "🔊"}
//       </button>

//     </div>
//   );
// }






// export default function VideoInfo({ video }) {
//   return (
//     <div className="video-info">

//       <div className="user">
//         <img
//           src={video.user.avatar}
//           alt=""
//         />

//         <strong>
//           @{video.user.username}
//         </strong>

//         <button>
//           Follow
//         </button>
//       </div>

//       <p>
//         {video.caption}
//       </p>

//       <div>
//         {video.hashtags?.map((tag) => (
//           <span key={tag}>
//             #{tag}{" "}
//           </span>
//         ))}
//       </div>

//     </div>
//   );
// }








// export default function VideoActions({ video }) {
//   return (
//     <div className="video-actions">

//       <button>
//         ❤️
//         <span>{video.likes.length}</span>
//       </button>

//       <button>
//         💬
//         <span>{video.commentsCount}</span>
//       </button>

//       <button>
//         ↗️
//         <span>Share</span>
//       </button>

//       <button>
//         🔖
//         <span>Save</span>
//       </button>

//     </div>
//   );
// }







// .video-feed {
//   height: 100vh;
//   overflow-y: scroll;

//   scroll-snap-type: y mandatory;

//   background: #000;
// }

// .video-card {
//   position: relative;

//   height: 100vh;

//   scroll-snap-align: start;

//   overflow: hidden;
// }




// .video-player {
//   position: absolute;

//   inset: 0;
// }

// .video {
//   width: 100%;
//   height: 100%;

//   object-fit: cover;
// }



// .video-actions {
//   position: absolute;

//   right: 20px;
//   bottom: 120px;

//   display: flex;
//   flex-direction: column;

//   gap: 20px;

//   z-index: 10;
// }

// .video-actions button {
//   background: none;
//   border: none;
//   color: white;

//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   cursor: pointer;
// }