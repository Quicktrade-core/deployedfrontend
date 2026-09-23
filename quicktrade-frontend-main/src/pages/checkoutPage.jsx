import { FaAngleLeft, FaArrowLeft } from "react-icons/fa"
import { Link, useNavigate } from "react-router"
import card from "../assets/card2.jpg"
import applePay from "../assets/applePay.jpg"
import master from "../assets/master.jpg"
import paypal from "../assets/paypal.jpg"
import visa from "../assets/visa.jpg"
import { useState } from "react"
import { MdLocationOn } from "react-icons/md"
import Scrolltotop from "../components/scrolltotop"

const CheckoutPage = () => {
  const navigate = useNavigate()
  const [id, setId] = useState(null)

  const fees = [
    { id: `1`, title: `Subtotal`, price: `$22.45` },
    { id: `2`, title: `Delivery`, price: `$5` },
    { id: `3`, title: `Total`, price: `$27.45` },
  ]

  const payments = [
    { id: `1`, image: applePay },
    { id: `2`, image: master },
    { id: `3`, image: paypal },
    { id: `4`, image: visa }
  ]

  return (
    <main className="bg-neutral-200 min-h-screen dark:bg-neutral-900 dark:text-white">
      <Scrolltotop />
      <button onClick={() => { navigate(-1) }} className="fixed top-5 left-5 z-20 cursor-pointer">
        <FaArrowLeft className="text-xl" />
      </button>
      <div className="bg-white sticky top-0 flex justify-center py-4 dark:bg-neutral-800">
        <span className="text-lg font-bold">Checkout</span>
      </div>
      <div className="p-4">
        <img src={card} alt="" className="w-full h-50 rounded-2xl" />
      </div>
      <div className="flex flex-col gap-5 p-4 my-2">
        <p className="font-bold">Delivery Address</p>
        <div className="flex items-center gap-3">
          <div className="bg-white text-neutral-900 flex justify-center items-center w-1/5 h-20 rounded-xl">
            <MdLocationOn className="text-5xl rounded-xl" />
          </div>
          <div className="flex flex-col gap-1 w-4/5">
            <p className="font-bold">Jenny Wilson</p>
            <p className="leading-tight">No. 55 Jonathan Street, Apo, Abuja, Nigeria</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 p-4 my-2">
        <p className="font-bold">Payment Method</p>
        <div className="flex justify-between">
          {payments.map(payment => (
            <button key={payment.id} onClick={() => { setId(payment.id) }} className={`rounded-xl cursor-pointer ${payment.id === id && 'outline-2 outline-neutral-800 dark:outline-white'}`}>
              <img src={payment.image} alt="" className="w-18 h-12 object-cover rounded-xl" />
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4 my-4">
        <p className="text-xl font-bold">Order Summary</p>
        <div className="flex flex-col gap-2">
          {fees.map(item => (
            <div key={item.id} className="flex justify-between">
              <span className="font-semibold">{item.title}</span>
              <span >{item.price}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white flex p-4 dark:bg-neutral-800">
        <Link to={`/login`} className="bg-gradient-to-b from-orange-600 to-orange-400 text-white text-center rounded-full w-full py-2">Pay now</Link>
      </div>
    </main>
  )
}

export default CheckoutPage