import { MdLocationOn } from "react-icons/md"
import logo from "/logo.png"

const Loading = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center fade">
      <img src={logo} alt="" className="w-30" />
      <p className="text-6xl font-bold mb-1">QuickTrade</p>
      <p className="text-xl font-bold">Commerce, Proximity, Persistence</p>
    </div>
  )
}

export default Loading