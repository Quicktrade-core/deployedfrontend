import { Link } from "react-router"

const NotfoundPage = () => {
  return (
    <div className="bg-orange-400 flex flex-col items-center justify-center gap-5 min-h-screen">
      <p className="text-xl font-bold">404, page not found!</p>
      <Link to={`/`} className="bg-white px-5 py-1 rounded-full">back to home</Link>
    </div>
  )
}

export default NotfoundPage