defmodule Solution do
  def unique_paths(m, n) when m <= 0 or n <= 0, do: 0

  # Every path is exactly m-1 downs and n-1 rights in some order, so the count
  # is the number of ways to choose which of the m+n-2 moves are downs -- a
  # binomial coefficient, and no grid at all. Multiplying and dividing in step
  # keeps every intermediate an exact integer.
  def unique_paths(m, n) do
    downs = m - 1
    total = m + n - 2

    Enum.reduce(1..downs//1, 1, fn i, acc -> div(acc * (total - downs + i), i) end)
  end
end
