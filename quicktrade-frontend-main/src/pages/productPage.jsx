// src/pages/productPage.jsx
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import { FaArrowLeft, FaStar } from "react-icons/fa"
import { BiCart } from "react-icons/bi"
import { MdMessage, MdVerified } from "react-icons/md"
import image from "../assets/profile_image.png"
import Scrolltotop from "../components/scrolltotop"
import { cartContext } from "../context/cartContext"
import { authContext } from "../context/authContext"

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000"

const ProductPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, cartCount } = useContext(cartContext)
  const { isAuthenticated } = useContext(authContext)

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selected, setSelected] = useState(null)
  const [added, setAdded] = useState(false)
  const [busy, setBusy] = useState(false)

  const sizes = [
    { _id: 1, size: "XS" }, { _id: 2, size: "S" }, { _id: 3, size: "M" },
    { _id: 4, size: "L" }, { _id: 5, size: "XL" },
  ]

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setLoading(true)
      setError("")
      try {
        const res = await fetch(`${API_BASE}/marketplace/listings/${id}/`)
        const data = await res.json()
        if (cancelled) return
        if (data?.success && data.listing) setProduct(data.listing)
        else setError(data?.error || "Product not found.")
      } catch (err) {
        console.error("Load product error:", err)
        if (!cancelled) setError("Network error. Please try again.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [id])

  const handleAddToCart = async () => {
    if (!product || busy) return
    if (!isAuthenticated) {
      navigate("/login")
      return
    }
    setBusy(true)
    const result = await addToCart(product.id, 1)
    setBusy(false)
    if (result.success) {
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    } else {
      alert(result.error || "Could not add to cart")
    }
  }

  if (loading) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center dark:bg-neutral-900 dark:text-white">
        <Scrolltotop />
        <p className="text-neutral-500">Loading product…</p>
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="bg-white min-h-screen flex flex-col items-center justify-center gap-4 p-6 dark:bg-neutral-900 dark:text-white">
        <Scrolltotop />
        <p className="text-lg font-bold">Product not found</p>
        <p className="text-neutral-500 text-sm text-center">
          {error || "This product may have been removed."}
        </p>
        <Link
          to="/"
          className="bg-gradient-to-r from-orange-600 to-orange-400 text-white px-5 py-2 rounded-full"
        >
          Back to home
        </Link>
      </main>
    )
  }

  return (
    <main className="bg-white min-h-screen dark:bg-neutral-900 dark:text-white">
      <Scrolltotop />
      <section>
        <div className="bg-white sticky top-0 flex justify-between items-center p-4 z-10 dark:bg-neutral-800">
          <button onClick={() => navigate(-1)} className="cursor-pointer">
            <FaArrowLeft className="text-xl" />
          </button>
          <p className="font-bold text-lg">Product Details</p>
          <Link to={`/cart`} className="relative">
            <BiCart className="text-2xl" />
            {cartCount > 0 && (
              <span className="bg-red-600 text-white text-[10px] w-4 h-4 rounded-full absolute -top-1 -right-1 flex items-center justify-center">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>
        </div>
        <img
          src={product.image_url || "/placeholder.png"}
          alt={product.title}
          className="w-full h-[45vh] object-cover"
        />
      </section>

      <section className="flex flex-col gap-5 p-4">
        <div className="flex flex-col gap-2">
          <p className="font-bold text-lg">{product.title}</p>
          <div className="flex justify-between">
            <span className="font-bold text-lg">₦{product.price}</span>
            <div className="flex items-center gap-2">
              <FaStar className="text-amber-300" />
              <span>{product.seller_rating?.toFixed?.(1) || "4.9"} Rating</span>
            </div>
          </div>
          {product.category?.name && (
            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full self-start">
              {product.category.name}
            </span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <Link to={`/seller`} className="flex items-center gap-3">
            <img src={image} alt="" className="w-12" />
            <div className="flex flex-col">
              <span className="font-bold">{product.seller?.name || "Seller"}</span>
              <p className="flex items-center gap-2">
                High ranking seller <MdVerified className="text-blue-400 text-lg" />
              </p>
            </div>
          </Link>
          <button className="cursor-pointer">
            <MdMessage className="text-xl" />
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-bold">Description</p>
          <p className="leading-tight">{product.description}</p>
        </div>

        <div className="flex justify-between">
          {sizes.map((size) => (
            <button
              key={size._id}
              onClick={() => setSelected(size._id)}
              className={`${selected === size._id ? "outline-2 outline-neutral-800 dark:outline-white" : ""} bg-neutral-200 w-10 p-2 font-bold rounded-lg cursor-pointer dark:bg-neutral-800`}
            >
              {size.size}
            </button>
          ))}
        </div>

        <div className="flex gap-5">
          <button
            onClick={handleAddToCart}
            disabled={busy}
            className="bg-gradient-to-r from-neutral-900 to-neutral-600 text-white w-1/2 p-2 rounded-lg cursor-pointer disabled:opacity-60 dark:from-white dark:to-white dark:text-neutral-900"
          >
            {busy ? "ADDING…" : added ? "IN CART" : "ADD TO CART"}
          </button>
          <Link
            to={`/checkout`}
            className="bg-gradient-to-r from-orange-600 to-orange-400 text-white text-center w-1/2 p-2 rounded-lg"
          >
            BUY NOW
          </Link>
        </div>
      </section>
    </main>
  )
}

export default ProductPage