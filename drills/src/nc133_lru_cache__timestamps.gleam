import gleam/dict.{type Dict}
import gleam/list

pub type LruCache {
  LruCache(capacity: Int, clock: Int, entries: Dict(Int, #(Int, Int)))
}

pub fn new(capacity: Int) -> LruCache {
  LruCache(capacity, 0, dict.new())
}

pub fn get(cache: LruCache, key: Int) -> #(Int, LruCache) {
  case dict.get(cache.entries, key) {
    Error(Nil) -> #(-1, cache)
    Ok(#(value, _stamp)) -> #(value, stamp(cache, key, value))
  }
}

pub fn put(cache: LruCache, key: Int, value: Int) -> LruCache {
  let cache = stamp(cache, key, value)
  case dict.size(cache.entries) > cache.capacity {
    False -> cache
    True ->
      LruCache(..cache, entries: dict.delete(cache.entries, oldest(cache)))
  }
}

/// No recency *order* at all — just a counter, bumped on every use. Eviction
/// then means scanning for the smallest stamp, so this trades the reordering
/// walk for a scan. It is the version to reach for when there is no linked list
/// to relink, and it makes plain that "least recently used" is a minimum, not a
/// position.
fn stamp(cache: LruCache, key: Int, value: Int) -> LruCache {
  LruCache(
    ..cache,
    clock: cache.clock + 1,
    entries: dict.insert(cache.entries, key, #(value, cache.clock)),
  )
}

fn oldest(cache: LruCache) -> Int {
  let entries = dict.to_list(cache.entries)
  let assert Ok(first) = list.first(entries)
  let found =
    list.fold(entries, first, fn(best: #(Int, #(Int, Int)), entry) {
      case entry.1.1 < best.1.1 {
        True -> entry
        False -> best
      }
    })
  found.0
}
