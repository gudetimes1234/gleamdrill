defmodule Solution do
  def new(capacity), do: %{capacity: capacity, entries: %{}, recent: []}

  @doc """
  Missing keys answer -1. Reading counts as use, so the cache comes back changed
  -- which is the part that makes an LRU cache awkward to express with immutable
  values, and the reason the return is a pair.
  """
  def get(cache, key) do
    case Map.fetch(cache.entries, key) do
      :error -> {-1, cache}
      {:ok, value} -> {value, %{cache | recent: touch(cache.recent, key)}}
    end
  end

  def put(cache, key, value) do
    recent = touch(cache.recent, key)
    entries = Map.put(cache.entries, key, value)

    # Over capacity by exactly one, so exactly one key goes: the last in the
    # recency order, which is what "least recently used" names.
    if length(recent) > cache.capacity do
      {keep, dropped} = Enum.split(recent, cache.capacity)
      %{cache | entries: Map.drop(entries, dropped), recent: keep}
    else
      %{cache | entries: entries, recent: recent}
    end
  end

  # The recency order, most recently used first. Moving a key to the front is
  # what a real implementation does by unlinking and relinking a node; here it
  # costs a walk, which is the price of having no back-pointers.
  defp touch(recent, key), do: [key | Enum.reject(recent, &(&1 == key))]
end
