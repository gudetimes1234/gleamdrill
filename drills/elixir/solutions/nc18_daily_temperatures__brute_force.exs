defmodule Solution do
  def daily_temperatures(temps) do
    # For each day, scan forward until it gets warmer. O(n^2) — the monotonic
    # stack exists only to avoid rescanning the same cold stretch every day.
    temps
    |> Enum.with_index()
    |> Enum.map(fn {temp, i} ->
      case Enum.find_index(Enum.drop(temps, i + 1), &(&1 > temp)) do
        nil -> 0
        offset -> offset + 1
      end
    end)
  end
end
