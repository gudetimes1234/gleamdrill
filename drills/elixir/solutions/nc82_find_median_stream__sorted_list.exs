defmodule Solution do
  def new, do: []

  # One sorted list, kept in order on insertion. Simpler to believe than two
  # halves, and the median is then just a lookup -- at the cost of an O(n)
  # insert where the two-heap version pays O(log n).
  def add_num(values, value), do: Enum.sort([value | values])

  def find_median([]), do: 0.0

  def find_median(values) do
    n = length(values)
    (Enum.at(values, div(n, 2)) + Enum.at(values, div(n - 1, 2))) / 2
  end
end
