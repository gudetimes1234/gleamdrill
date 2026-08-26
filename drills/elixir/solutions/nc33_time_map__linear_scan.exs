defmodule Solution do
  def new, do: %{}

  def set(store, key, value, timestamp) do
    Map.update(store, key, [{timestamp, value}], &[{timestamp, value} | &1])
  end

  # Newest first, so the first entry old enough is the answer. O(n) per lookup
  # against the halving version's O(log n), but there is no split arithmetic to
  # get wrong.
  def get(store, key, timestamp) do
    store
    |> Map.get(key, [])
    |> Enum.find_value("", fn {stamp, value} -> if stamp <= timestamp, do: value end)
  end
end
