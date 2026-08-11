defmodule Solution do
  def find_min([]), do: nil

  def find_min([head | rest]) do
    # O(n), but it makes the shape obvious: a rotated sorted list drops exactly
    # once, and that drop is the minimum. No drop means it was never rotated.
    scan(rest, head, head)
  end

  defp scan([], _previous, head), do: head

  defp scan([n | rest], previous, head) do
    if n < previous, do: n, else: scan(rest, n, head)
  end
end
