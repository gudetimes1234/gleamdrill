defmodule Solution do
  def largest_rectangle_area(heights) do
    indexed = Enum.with_index(heights)

    Enum.reduce(indexed, 0, fn {h, i}, best ->
      # How far this bar's own height can spread in each direction. O(n^2), and
      # the definition of the answer: every rectangle is some bar taken as far
      # as it will go.
      left =
        indexed
        |> Enum.take(i)
        |> Enum.reverse()
        |> Enum.take_while(fn {other, _} -> other >= h end)
        |> length()

      right =
        indexed
        |> Enum.drop(i + 1)
        |> Enum.take_while(fn {other, _} -> other >= h end)
        |> length()

      max(best, h * (left + right + 1))
    end)
  end
end
