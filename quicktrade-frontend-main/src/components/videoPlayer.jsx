import { useEffect, useRef, useState } from "react";
import { BiPackage } from "react-icons/bi";
import { FaComment, FaHeart, FaPaperPlane, FaShare, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { GiShare } from "react-icons/gi";
import { MdPerson, MdVerified } from "react-icons/md";
import { TbBookmarkFilled } from "react-icons/tb";
import { Link } from "react-router";

const VideoPlayer = ({ src, videoData, muted, setMuted }) => {
  const videoRef = useRef(null)
  const [like, setLike] = useState(false)
  const [following, setFollowing] = useState(false)
  const style = `bg-none border-none text-white flex flex-col items-center cursor-pointer`

  const toggleMute = () => {
    setMuted(previous => !previous)
  }

  useEffect(() => {
    const video = videoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.7,
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <video className="w-full h-full object-cover"
        ref={videoRef}
        src={src}
        muted={muted}
        loop
        playsInline
        preload="metadata"
      />
      <div className="absolute right-5 bottom-40 flex flex-col gap-5 z-10">
        <button onClick={() => { setLike(previous => !previous) }} className={`${style}`}>
          {like ? <FaHeart className="text-red-600 text-xl" /> : <FaHeart className="text-xl" />}
          <span>{like ? Number(videoData.likes) + 1 : videoData.likes}</span>
        </button>
        <button className={`${style}`}>
          <FaComment className="text-xl" />
          <span>{videoData.comments}</span>
        </button>
        <button className={`${style}`}>
          <TbBookmarkFilled className="text-xl" />
          <span>{videoData.save}</span>
        </button>
        <button className={`${style}`}>
          <FaPaperPlane className="text-xl" />
          <span>{videoData.share}</span>
        </button>
      </div>
      <Link to={`/product/${videoData._id}`} className="bg-neutral-900/30 text-white absolute left-5 bottom-40 flex items-center gap-3 p-2 rounded-full">
        <BiPackage className="text-xl" /> view product
      </Link>
      <div className="bg-neutral-900/30 absolute bottom-0 left-0 p-4 flex flex-col gap-3 z-10">
        <div className="flex justify-between items-center">
          <Link to={`/seller`} className="flex items-center gap-3">
            <img src={videoData.image} alt={videoData.name} className="w-12" />
            <div className="flex flex-col text-white">
              <p className="font-bold">@{videoData.name}</p>
              <p className="flex items-center gap-2">High ranking seller <MdVerified className="text-blue-400 text-lg" /></p>
            </div>
          </Link>
          {!following && <button onClick={() => { setFollowing(previous => !previous) }} className="bg-gradient-to-r from-orange-600 to-orange-400 text-white flex justify-center items-center gap-2 px-4 py-1 rounded-full cursor-pointer">
            <MdPerson className="" /> Follow
          </button>}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-white leading-tight w-9/10">{videoData.caption}</p>
          <button onClick={toggleMute} className="cursor-pointer">
            {muted ? <FaVolumeMute className="text-white text-2xl" /> : <FaVolumeUp className="text-white text-2xl" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer