// src/hooks/useProducts.js
import { useCallback, useEffect, useRef, useState } from "react";
import { getCache, setCache, updateCache } from "../utils/productCache";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

const FIRST_PAGE_SIZE = 30;
const BACKGROUND_PAGE_SIZE = 30;
const MAX_BACKGROUND_PAGES = 10;      // safety cap: fetch up to 10 more pages

export const useProducts = (categorySlug = "all", type = "all") => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState("");

  const cancelledRef = useRef(false);
  const runningRef = useRef(false);

  const fetchPage = useCallback(
    async (page, pageSize) => {
      const url = new URL(`${API_BASE}/marketplace/listings/`);
      if (categorySlug && categorySlug !== "all") {
        url.searchParams.set("category", categorySlug);
      }
      if (type && type !== "all") {
        url.searchParams.set("type", type);
      }
      url.searchParams.set("page", String(page));
      url.searchParams.set("page_size", String(pageSize));

      const res = await fetch(url.toString());
      const data = await res.json();
      if (!data?.success) throw new Error(data?.error || "Failed to load");
      return data;
    },
    [categorySlug, type]
  );

  const load = useCallback(async () => {
    if (runningRef.current) return;
    runningRef.current = true;
    cancelledRef.current = false;

    // ---- serve from cache if fresh ----
    const cached = getCache(categorySlug, type);
    if (cached && cached.listings.length > 0) {
      setProducts(cached.listings);
      setTotal(cached.total || cached.listings.length);
      setHasMore(cached.hasMore);
      setLoading(false);
      // if background fetch never completed, resume it
      if (cached.hasMore) runBackgroundLoad(cached.loadedPages || [1]);
      runningRef.current = false;
      return;
    }

    // ---- fresh fetch of page 1 ----
    setLoading(true);
    setError("");
    try {
      const data = await fetchPage(1, FIRST_PAGE_SIZE);
      if (cancelledRef.current) return;

      setProducts(data.listings);
      setTotal(data.total);
      setHasMore(data.has_more);

      setCache(categorySlug, type, {
        listings: data.listings,
        total: data.total,
        hasMore: data.has_more,
        loadedPages: [1],
      });

      setLoading(false);

      // ---- kick off background loading ----
      if (data.has_more) runBackgroundLoad([1]);
    } catch (err) {
      if (!cancelledRef.current) {
        setError(err.message || "Network error");
        setLoading(false);
      }
    } finally {
      runningRef.current = false;
    }
  }, [categorySlug, type, fetchPage]);

  const runBackgroundLoad = useCallback(
    async (alreadyLoadedPages = [1]) => {
      let page = 2;
      let pagesDone = 0;
      let stillHasMore = true;
      let acc = [...(getCache(categorySlug, type)?.listings || [])];
      const loaded = new Set(alreadyLoadedPages);

      while (stillHasMore && pagesDone < MAX_BACKGROUND_PAGES && !cancelledRef.current) {
        try {
          const data = await fetchPage(page, BACKGROUND_PAGE_SIZE);
          if (cancelledRef.current) return;

          acc = [...acc, ...data.listings];
          loaded.add(page);

          setProducts(acc);
          setTotal(data.total);
          setHasMore(data.has_more);

          updateCache(categorySlug, type, {
            listings: acc,
            total: data.total,
            hasMore: data.has_more,
            loadedPages: Array.from(loaded),
          });

          stillHasMore = data.has_more;
          page += 1;
          pagesDone += 1;

          // small pause so we don't hammer the backend
          await new Promise((r) => setTimeout(r, 200));
        } catch (err) {
          console.warn("[useProducts] background load failed:", err);
          break;
        }
      }

      if (!cancelledRef.current) {
        setLoadingMore(false);
      }
    },
    [categorySlug, type, fetchPage]
  );

  // Load when category or type changes
  useEffect(() => {
    cancelledRef.current = false;
    setProducts([]);
    setLoading(true);
    setHasMore(false);
    load();

    return () => {
      cancelledRef.current = true;
    };
  }, [categorySlug, type, load]);

  return {
    products,
    total,
    loading,
    loadingMore,
    hasMore,
    error,
  };
};