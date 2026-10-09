// src/pages/productPage.jsx
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { FaArrowLeft, FaStar, FaCalendarAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { BiCart } from "react-icons/bi";
import { MdMessage, MdVerified, MdConfirmationNumber } from "react-icons/md";
import profileImage from "../assets/profile_image.png";
import Scrolltotop from "../components/scrolltotop";
import { cartContext } from "../context/cartContext";
import { authContext } from "../context/authContext";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

function fmtFull(dateStr) {
  if (!dateStr) return "TBA";
  try {
    return new Date(dateStr).toLocaleString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
}

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartCount } = useContext(cartContext);
  const { isAuthenticated } = useContext(authContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [busy, setBusy] = useState(false);

  const isTicket = product?.type === "ticket";
  const maxQty = isTicket ? 7 : 99;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE}/marketplace/listings/${id}/`);
        const data = await res.json();
        if (cancelled) return;
        if (data?.success && data.listing) {
          setProduct(data.listing);
        } else {
          setError(data?.error || "Product not found.");
        }
      } catch (err) {
        console.error("Load product error:", err);
        if (!cancelled) setError("Network error. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleAddToCart = async () => {
    if (!product || busy) return;
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    setBusy(true);
    const result = await addToCart(product.id, quantity);
    setBusy(false);
    if (result.success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } else {
      alert(result.error || "Could not add to cart");
    }
  };

  if (loading) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center dark:bg-neutral-900 dark:text-white">
        <Scrolltotop />
        <p className="text-neutral-500">Loading…</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="bg-white min-h-screen flex flex-col items-center justify-center gap-4 p-6 dark:bg-neutral-900 dark:text-white">
        <Scrolltotop />
        <p className="text-lg font-bold">Product not found</p>
        <p className="text-neutral-500 text-sm text-center">{error}</p>
        <Link
          to="/"
          className="bg-gradient-to-r from-orange-600 to-orange-400 text-white px-5 py-2 rounded-full"
        >
          Back to home
        </Link>
      </main>
    );
  }

  const t = product.ticket;

  return (
    <main className="bg-white min-h-screen dark:bg-neutral-900 dark:text-white">
      <Scrolltotop />

      <section>
        <div className="bg-white sticky top-0 flex justify-between items-center p-4 z-10 dark:bg-neutral-800">
          <button onClick={() => navigate(-1)} className="cursor-pointer">
            <FaArrowLeft className="text-xl" />
          </button>
          <p className="font-bold text-lg">{isTicket ? "Ticket Details" : "Product Details"}</p>
          <Link to="/cart" className="relative">
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
          {isTicket && (
            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full self-start flex items-center gap-1">
              <MdConfirmationNumber /> Event Ticket
            </span>
          )}
          <p className="font-bold text-lg">{product.title}</p>
          <div className="flex justify-between">
            <span className="font-bold text-lg">₦{product.price}</span>
            <div className="flex items-center gap-2">
              <FaStar className="text-amber-300" />
              <span>{product.seller_rating?.toFixed?.(1) || "4.9"} Rating</span>
            </div>
          </div>
          {product.category?.name && (
            <span className="text-xs px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-full self-start">
              {product.category.name}
            </span>
          )}
        </div>

        {isTicket && t && (
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4 flex flex-col gap-2 text-sm">
            <p className="flex items-center gap-2">
              <FaCalendarAlt className="text-orange-500" /> Starts {fmtFull(t.event_date)}
            </p>
            {t.event_end_time && (
              <p className="flex items-center gap-2 text-neutral-500">
                <FaClock className="text-orange-500" /> Ends {fmtFull(t.event_end_time)}
              </p>
            )}
            {t.event_venue && (
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-orange-500" /> {t.event_venue}
              </p>
            )}
            {t.tier_badge && (
              <p className="text-xs px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full self-start">
                {t.tier_badge}
              </p>
            )}
            {t.is_sold_out && (
              <p className="text-xs font-semibold text-red-500">SOLD OUT</p>
            )}
            {!t.is_sold_out && t.remaining_capacity != null && (
              <p className="text-xs text-neutral-500">
                {t.remaining_capacity} ticket{t.remaining_capacity === 1 ? "" : "s"} remaining
              </p>
            )}
          </div>
        )}

        <div className="flex justify-between items-center">
          <Link to="/seller" className="flex items-center gap-3">
            <img src={profileImage} alt="" className="w-12" />
            <div className="flex flex-col">
              <span className="font-bold">{product.seller?.name || "Seller"}</span>
              <p className="flex items-center gap-2 text-xs text-neutral-500">
                Verified seller <MdVerified className="text-blue-400" />
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

        {isTicket && (
          <div className="flex items-center justify-between">
            <span className="font-semibold">Quantity</span>
            <div className="flex items-center gap-4 border-2 border-neutral-200 dark:border-neutral-700 rounded-full px-3 py-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-xl"
              >
                −
              </button>
              <span className="font-bold w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                className="text-xl"
              >
                +
              </button>
            </div>
          </div>
        )}

        <div className="flex gap-5">
          <button
            onClick={handleAddToCart}
            disabled={busy || (isTicket && t?.is_sold_out)}
            className="bg-gradient-to-r from-neutral-900 to-neutral-600 text-white w-1/2 p-3 rounded-lg cursor-pointer disabled:opacity-60 dark:from-white dark:to-white dark:text-neutral-900"
          >
            {busy
              ? "ADDING…"
              : added
              ? "IN CART"
              : isTicket && t?.is_sold_out
              ? "SOLD OUT"
              : "ADD TO CART"}
          </button>
          <Link
            to="/checkout"
            className="bg-gradient-to-r from-orange-600 to-orange-400 text-white text-center w-1/2 p-3 rounded-lg"
          >
            BUY NOW
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ProductPage;