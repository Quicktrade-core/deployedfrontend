// src/utils/productCache.js
/**
 * In-memory cache for paginated product listings.
 * Keyed by "<category>::<type>". Stores what we've fetched so far.
 */

const cache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

function makeKey(category = "all", type = "all") {
  return `${category}::${type}`;
}

export function getCache(category, type) {
  const key = makeKey(category, type);
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry;
}

export function setCache(category, type, data) {
  const key = makeKey(category, type);
  cache.set(key, { ...data, ts: Date.now() });
}

export function updateCache(category, type, patch) {
  const key = makeKey(category, type);
  const entry = cache.get(key) || { listings: [], loadedPages: [], hasMore: true, total: 0, ts: Date.now() };
  cache.set(key, { ...entry, ...patch, ts: Date.now() });
}

export function clearCache() {
  cache.clear();
}