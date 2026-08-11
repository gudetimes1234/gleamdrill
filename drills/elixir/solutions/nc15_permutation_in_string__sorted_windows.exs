defmodule Solution do
  def inclusion?(s1, s2) do
    # Every window of the right length, sorted and compared. Slower, but there
    # is no incremental state to get wrong.
    needle = s1 |> String.graphemes() |> Enum.sort()
    size = length(needle)
    graphemes = String.graphemes(s2)

    cond do
      size == 0 -> true
      size > length(graphemes) -> false
      true -> graphemes |> Enum.chunk_every(size, 1, :discard) |> Enum.any?(&(Enum.sort(&1) == needle))
    end
  end
end
