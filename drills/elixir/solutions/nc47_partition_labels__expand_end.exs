defmodule Solution do
  def partition_labels(s), do: cut(String.graphemes(s), [])

  defp cut([], acc), do: Enum.reverse(acc)

  defp cut(rest, acc) do
    size = grow(rest, 1)
    cut(Enum.drop(rest, size), [size | acc])
  end

  # Grow the piece one character at a time until nothing inside it also appears
  # in what is left. No last-position map -- the tail is asked directly -- which
  # is far slower but is the condition stated outright.
  defp grow(rest, size) do
    prefix = Enum.take(rest, size)
    tail = Enum.drop(rest, size)
    if Enum.any?(prefix, &(&1 in tail)), do: grow(rest, size + 1), else: size
  end
end
