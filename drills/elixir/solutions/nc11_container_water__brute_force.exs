defmodule Solution do
  def max_area(heights) do
    # Every pair of lines, measured — the definition the two-pointer sweep is
    # an optimisation of.
    indexed = Enum.with_index(heights)

    areas =
      for {a, i} <- indexed,
          {b, j} <- indexed,
          j > i,
          do: min(a, b) * (j - i)

    Enum.max([0 | areas])
  end
end
