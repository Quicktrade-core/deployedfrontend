// src/pages/homePage.jsx
import { Link } from "react-scroll";
import { useEffect, useState } from "react";
import Header from "../components/header";
import ProductCard from "../components/productCard";
import Marquee from "react-fast-marquee";
import { useProducts } from "../hooks/useProducts";

import bagImg from "../assets/bag.jpg";
import carImg from "../assets/car.jpg";
import clothImg from "../assets/cloth.jpg";
import glassImg from "../assets/glass.jpg";
import phoneImg from "../assets/phone.jpg";
import shoeImg from "../assets/shoe.jpg";
import snackImg from "../assets/snack.jpg";
import watchImg from "../assets/watch.jpg";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

const CATEGORY_FALLBACK = {
  watches: watchImg,
  cars: carImg,
  shoes: shoeImg,
  bags: bagImg,
  phones: phoneImg,
  glasses: glassImg,
  cloths: clothImg,
  snacks: snackImg,
  tickets: watchImg,
  other: bagImg,
};

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState("all");
  const [catLoading, setCatLoading] = useState(true);

  const { products, total, loading, hasMore, error } = useProducts(selectedSlug, "all");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/marketplace/categories/`);
        const data = await res.json();
        if (cancelled) return;
        if (data?.success) {
          setCategories([
            { slug: "all", name: "All", image_url: "/hero.jpg" },
            ...(data.categories || []),
          ]);
        }
      } catch (err) {
        console.error("Category load error:", err);
      } finally {
        if (!cancelled) setCatLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const info = [
    "Nationwide delivery", "10% off your first order", "Secure payment",
    "Free shipping on orders over $50", "New products added every week",
  ];

  return (
    <div>
      <Header />
      <main className="bg-white flex flex-col gap-10 py-4 z-0 min-h-screen dark:bg-neutral-900 dark:text-white pb-28">
        <div className="bg-[url('/hero.jpg')] bg-cover bg-center h-[25vh] mx-4 rounded-2xl relative">
          <div className="bg-neutral-800/30 absolute inset-0 rounded-2xl"></div>
          <div className="absolute bottom-4 left-4">
            <h1 className="text-white text-xl font-bold leading-tight mb-5">
              Order your favourite <br /> products here
            </h1>
            <Link
              to="category"
              offset={-100}
              className="bg-white text-neutral-900 rounded-full px-3 py-1 hover:bg-gradient-to-r from-orange-600 to-orange-400 hover:text-white cursor-pointer"
            >
              View category
            </Link>
          </div>
        </div>

        <div className="mx-4">
          <Marquee pauseOnHover={true}>
            {info.map((item) => (
              <p key={item} className="px-2 font-bold">{item}</p>
            ))}
          </Marquee>
        </div>

        <div id="category" className="flex flex-col gap-10">
          <div className="bg-white flex overflow-x-auto sticky top-[15vh] py-2 z-10 dark:bg-neutral-900">
            {catLoading && Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center w-2/9 shrink-0 animate-pulse">
                <div className="w-18 h-18 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                <div className="w-12 h-3 bg-neutral-200 dark:bg-neutral-800 mt-2 rounded" />
              </div>
            ))}
            {!catLoading && categories.map((cat) => {
              const active = cat.slug === selectedSlug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedSlug(cat.slug)}
                  className="flex flex-col items-center w-2/9 shrink-0 cursor-pointer"
                >
                  <img
                    src={cat.image_url || CATEGORY_FALLBACK[cat.slug] || "/placeholder.png"}
                    alt={cat.name}
                    className={`${active ? "border-4 border-orange-600" : ""} w-18 h-18 rounded-full object-cover`}
                  />
                  <span className={`${active ? "text-orange-600" : ""}`}>{cat.name}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-5 mb-20">
            {loading && products.length === 0 && Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-38 h-44 rounded-lg bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
            ))}

            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && products.length === 0 && (
              <p className="text-neutral-500">No products in this category yet.</p>
            )}

            {products.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}

            {hasMore && (
              <div className="w-full flex justify-center py-4">
                <p className="text-sm text-neutral-500">
                  Loaded {products.length} of {total}… fetching more in the background
                </p>
              </div>
            )}
            {!hasMore && products.length > 0 && (
              <div className="w-full flex justify-center py-4">
                <p className="text-xs text-neutral-400">All {total} products loaded</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;