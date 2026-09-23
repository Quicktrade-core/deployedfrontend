import { FaStar } from "react-icons/fa"
import { store_list } from "../assets/assets"
import { Link } from "react-router"

const Stores = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {store_list.map(store => (
        <div key={store._id} className="bg-white flex p-2 rounded-xl dark:bg-neutral-800">
          <div className="w-1/2 flex flex-col justify-center items-center gap-3">
            <p className="font-bold leading-tight text-center">{store.name}</p>
            <div className="flex items-center gap-1">
              <FaStar className="text-amber-400" />
              <span className="text-neutral-500 text-sm dark:text-white">4.9 - 16 products</span>
            </div>
            <Link to={store.path} className="bg-gradient-to-r from-orange-600 to-orange-400 text-white flex gap-4 px-2 rounded-xl">View store</Link>
          </div>
          <img src={store.image} alt="" className="w-1/2 h-30 object-cover rounded-xl" />
        </div>
      ))}
    </div>
  )
}

export default Stores