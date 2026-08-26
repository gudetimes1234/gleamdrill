defmodule Solution do
  # Immutable, so the store is a value that set returns a new version of.
  def new, do: %{}

  # Timestamps only ever increase, so prepending keeps each key's history sorted
  # newest first for free.
  def set(store, key, value, timestamp) do
    Map.update(store, key, [{timestamp, value}], &[{timestamp, value} | &1])
  end

  def get(store, key, timestamp) do
    case Map.get(store, key) do
      nil -> ""
      history -> newest_at_most(List.to_tuple(history), timestamp, 0, length(history) - 1)
    end
  end

  # The history is sorted newest first, so the newest entry at or before a
  # timestamp is a halving question, not a walk.
  defp newest_at_most(_history, _timestamp, low, high) when low > high, do: ""

  defp newest_at_most(history, timestamp, low, high) do
    mid = div(low + high, 2)
    {stamp, value} = elem(history, mid)

    if stamp <= timestamp do
      case newest_at_most(history, timestamp, low, mid - 1) do
        "" -> value
        newer -> newer
      end
    else
      newest_at_most(history, timestamp, mid + 1, high)
    end
  end
end
