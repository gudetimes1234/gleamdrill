import gleam/dict.{type Dict}
import gleam/list

pub type LruCache {
  LruCache(capacity: Int, entries: Dict(Int, Int), recent: List(Int))
}

pub fn new(capacity: Int) -> LruCache {
  LruCache(capacity, dict.new(), [])
}

/// Missing keys answer -1. Reading counts as use, so the cache comes back
/// changed — which is the part that makes an LRU cache awkward to express with
/// immutable values, and the reason the signature has to return both.
pub fn get(cache: LruCache, key: Int) -> #(Int, LruCache) {
  case dict.get(cache.entries, key) {
    Error(Nil) -> #(-1, cache)
    Ok(value) -> #(value, LruCache(..cache, recent: touch(cache.recent, key)))
  }
}

pub fn put(cache: LruCache, key: Int, value: Int) -> LruCache {
  let recent = touch(cache.recent, key)
  let entries = dict.insert(cache.entries, key, value)
  // Over capacity by exactly one, so exactly one key goes: the last in the
  // recency order, which is what "least recently used" names.
  case list.length(recent) > cache.capacity {
    False -> LruCache(..cache, entries: entries, recent: recent)
    True -> {
      let keep = list.take(recent, cache.capacity)
      let dropped = list.drop(recent, cache.capacity)
      LruCache(
        ..cache,
        entries: list.fold(dropped, entries, fn(acc, stale) {
          dict.delete(acc, stale)
        }),
        recent: keep,
      )
    }
  }
}

/// The recency order, most recently used first. Moving a key to the front is
/// what a real implementation does by unlinking and relinking a node; here it
/// costs a walk, which is the price of having no back-pointers.
fn touch(recent: List(Int), key: Int) -> List(Int) {
  [key, ..list.filter(recent, fn(other) { other != key })]
}
