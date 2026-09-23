import { Link, useNavigate } from "react-router"
import delivery from "../assets/delivery.jpg"
import { FaAngleLeft, FaArrowLeft } from "react-icons/fa"
import Scrolltotop from "../components/scrolltotop"

const OrderPage = () => {
  const navigate = useNavigate()

  const data = [
    { id: `1`, title: `Order ID`, value: `#100100` },
    { id: `2`, title: `Delivery Address`, value: `45 onye's house` },
    { id: `3`, title: `Tracking ID`, value: `12345678` },
    { id: `4`, title: `Est. Delivery Date`, value: `20 Aug 2026, 9:10 AM` }
  ]

  const order = [
    { id: `1`, title: `watch`, category: `watch`, price: `200.87` },
    { id: `2`, title: `shoe`, category: `shoe`, price: `80.90` },
    { id: `3`, title: `bag`, category: `bag`, price: `120.23` }
  ]

  return (
    <main className="bg-white min-h-screen p-4 dark:bg-neutral-900 dark:text-white">
      <Scrolltotop />
      <button onClick={() => { navigate(-1) }} className="fixed top-5 left-5 z-20 cursor-pointer">
        <FaArrowLeft className="text-xl" />
      </button>
      <div className="flex flex-col items-center py-20">
        <img src={delivery} alt="" className="w-30 rounded-xl" />
        <p className="text-2xl font-bold">Order Status</p>
        <p>Your package is on the way</p>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          {order.map(item => (
            <div key={item.id} className="bg-neutral-200 flex gap-5 p-2 rounded-xl dark:bg-neutral-800">
              <img src={delivery} alt="" className="w-1/5 rounded-xl" />
              <div className="flex justify-between items-center w-4/5">
                <div className="flex flex-col gap-2">
                  <span className="text-neutral-500 dark:text-white">{item.category}</span>
                  <p className="text-lg font-bold">{item.title}</p>
                </div>
                <span className="text-lg font-bold">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xl font-bold py-4 border-y border-y-neutral-500 dark:border-y-white">Order Summary</p>
        <div className="flex flex-col gap-3">
          {data.map(item => (
            <div key={item.id} className="flex justify-between items-center">
              <span className="text-neutral-500 dark:text-white">{item.title}</span>
              <span className="font-bold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default OrderPage