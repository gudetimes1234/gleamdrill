defmodule Solution do
  # Immutable, so the store is a value that add returns a new version of.
  def new, do: %{}

  def add(counts, {x, y}), do: Map.update(counts, {x, y}, 1, &(&1 + 1))

  # Pick the corner diagonally opposite: that one choice fixes the whole square,
  # because the other two corners must be at (x, py) and (px, y). A valid
  # diagonal partner shares neither coordinate and sits on a true diagonal, and
  # duplicates multiply rather than repeat.
  def count(counts, {x, y}) do
    Enum.reduce(counts, 0, fn {{px, py}, copies}, total ->
      if px != x and py != y and abs(px - x) == abs(py - y) do
        total + copies * Map.get(counts, {x, py}, 0) * Map.get(counts, {px, y}, 0)
      else
        total
      end
    end)
  end
end
