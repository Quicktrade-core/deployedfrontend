// src/components/productCard.jsx
import { Link } from "react-router"
import { FaStar } from "react-icons/fa"

const ProductCard = ({ item, large }) => {
  return (
    <div className={`${large ? 'w-50 rounded-t-xl' : 'w-38 rounded-t-lg'} relative bg-white shrink-0 dark:bg-neutral-900`}>
      <Link to={`/product/${item.id}`}>
        <img
          src={item.image_url || "/placeholder.png"}
          alt={item.title}
          className={`${large ? 'rounded-t-xl h-30' : 'rounded-t-lg h-35'} w-full object-cover`}
        />
        <div className="flex flex-col gap-1 py-2">
          <p className="font-semibold leading-tight">{item.title}</p>
          <div className="flex items-center gap-1">
            <FaStar className="text-amber-400" />
            <p className="text-neutral-500 text-sm dark:text-white">
              {item.seller_rating?.toFixed?.(1) || "4.9"} - {item.views || 0} sold
            </p>
          </div>
          <div className="flex items-center gap-3 text-neutral-500 dark:text-white">
            <span className="font-semibold">₦{item.price}</span>
            {item.distance != null && <span className="text-sm">{item.distance} km</span>}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard