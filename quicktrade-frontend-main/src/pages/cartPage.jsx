// src/pages/cartPage.jsx
import { Link, useNavigate } from "react-router"
import { MdDelete } from "react-icons/md"
import { FaArrowLeft } from "react-icons/fa"
import { useContext } from "react"
import { cartContext } from "../context/cartContext"
import { authContext } from "../context/authContext"
import CartItem from "../components/cartItem"
import Scrolltotop from "../components/scrolltotop"

const CartPage = () => {
  const navigate = useNavigate()
  const {
    cartItems, subtotal, buyerFeesTotal, delivery, grandTotal,
    loading, error, clearCart,
  } = useContext(cartContext)
  const { isAuthenticated } = useContext(authContext)

  const handleClear = async () => {
    if (!confirm("Remove all items from your cart?")) return
    await clearCart()
  }

  return (
    <main className="bg-neutral-200 min-h-screen dark:bg-neutral-900 dark:text-white">
      <Scrolltotop />
      <div className="bg-neutral-200 sticky top-0 flex justify-between items-center p-4 dark:bg-neutral-900 z-10">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <FaArrowLeft className="text-xl" />
        </button>
        <p className="text-lg font-bold">Cart ({cartItems.length})</p>
        <button
          onClick={handleClear}
          className="cursor-pointer"
          disabled={!cartItems.length}
        >
          <MdDelete className={`text-2xl ${!cartItems.length ? "opacity-40" : ""}`} />
        </button>
      </div>

      <div className="flex flex-col gap-5 min-h-[60vh] overflow-auto bg-white p-4 dark:bg-neutral-800">
        {!isAuthenticated && (
          <div className="h-full flex flex-col items-center justify-center gap-4 py-20">
            <p className="text-lg font-bold">Sign in to use your cart</p>
            <Link
              to="/login"
              className="bg-gradient-to-r from-orange-600 to-orange-400 text-white px-6 py-2 rounded-full"
            >
              Sign in
            </Link>
          </div>
        )}
        {isAuthenticated && loading && (
          <p className="text-center text-neutral-500 py-10">Loading cart…</p>
        )}
        {isAuthenticated && !loading && error && (
          <p className="text-center text-red-500 py-10">{error}</p>
        )}
        {isAuthenticated && !loading && !error && cartItems.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center gap-4 py-20">
            <p className="text-lg font-bold">Your cart is empty</p>
            <Link
              to="/"
              className="bg-gradient-to-r from-orange-600 to-orange-400 text-white px-6 py-2 rounded-full"
            >
              Browse products
            </Link>
          </div>
        )}
        {isAuthenticated && !loading && cartItems.map((item) => (
          <CartItem key={item.cart_item_id} item={item} />
        ))}
      </div>

      {isAuthenticated && cartItems.length > 0 && (
        <>
          <div className="bg-white flex flex-col gap-3 p-4 my-4 dark:bg-neutral-800">
            <p className="text-xl font-bold">Order Summary</p>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">Subtotal</span>
                <span>₦{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">
                  Escrow service fee (buyer half)
                </span>
                <span>₦{buyerFeesTotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">Delivery</span>
                <span>₦{delivery}</span>
              </div>
              <div className="flex justify-between border-t pt-2 mt-2 dark:border-neutral-700">
                <span className="font-bold">Total to pay</span>
                <span className="font-bold">₦{grandTotal}</span>
              </div>
              <p className="text-xs text-neutral-400 leading-tight mt-1">
                The escrow fee is split 50/50 with the seller. They absorb the
                other half before payout.
              </p>
            </div>
          </div>

          <div className="bg-white flex p-4 dark:bg-neutral-800">
            <Link
              to="/checkout"
              className="bg-gradient-to-b from-orange-600 to-orange-400 text-white text-center rounded-full w-full py-2"
            >
              Checkout now
            </Link>
          </div>
        </>
      )}
    </main>
  )
}

export default CartPage