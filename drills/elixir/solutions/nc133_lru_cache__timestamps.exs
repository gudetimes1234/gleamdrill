defmodule Solution do
  def new(capacity), do: %{capacity: capacity, clock: 0, entries: %{}}

  def get(cache, key) do
    case Map.fetch(cache.entries, key) do
      :error -> {-1, cache}
      {:ok, {value, _stamp}} -> {value, stamp(cache, key, value)}
    end
  end

  def put(cache, key, value) do
    cache = stamp(cache, key, value)

    if map_size(cache.entries) > cache.capacity,
      do: %{cache | entries: Map.delete(cache.entries, oldest(cache))},
      else: cache
  end

  # No recency *order* at all -- just a counter, bumped on every use. Eviction
  # then means scanning for the smallest stamp, so this trades the reordering
  # walk for a scan. It is the version to reach for when there is no linked list
  # to relink, and it makes plain that "least recently used" is a minimum, not a
  # position.
  defp stamp(cache, key, value) do
    %{
      cache
      | clock: cache.clock + 1,
        entries: Map.put(cache.entries, key, {value, cache.clock})
    }
  end

  defp oldest(cache) do
    {key, _entry} =
      Enum.min_by(cache.entries, fn {_key, {_value, stamp}} -> stamp end)

    key
  end
end
