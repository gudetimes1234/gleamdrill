defmodule Solution do
  def new, do: %{}

  def add(counts, {x, y}), do: Map.update(counts, {x, y}, 1, &(&1 + 1))

  # Pick the corner directly above or below instead. That fixes the side length,
  # which leaves two squares to check rather than one -- the remaining corners
  # can be to the left or to the right.
  def count(counts, {x, y}) do
    Enum.reduce(counts, 0, fn {{px, py}, copies}, total ->
      if px == x and py != y do
        side = abs(py - y)

        total +
          copies *
            (pair(counts, x + side, y, py) + pair(counts, x - side, y, py))
      else
        total
      end
    end)
  end

  defp pair(counts, column, low, high) do
    Map.get(counts, {column, low}, 0) * Map.get(counts, {column, high}, 0)
  end
end
