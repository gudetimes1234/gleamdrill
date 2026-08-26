defmodule Solution do
  def partition_labels(s) do
    graphemes = String.graphemes(s)

    # Overwriting as we go leaves each character mapped to its last position.
    last =
      graphemes
      |> Enum.with_index()
      |> Enum.reduce(%{}, fn {c, i}, acc -> Map.put(acc, c, i) end)

    # A piece can only end where every character it contains has run out. Extend
    # the end to the furthest last-position seen; when the walk catches up with
    # it, the piece is closed.
    {parts, _start, _end} =
      graphemes
      |> Enum.with_index()
      |> Enum.reduce({[], 0, -1}, fn {c, i}, {parts, start, finish} ->
        finish = max(finish, Map.fetch!(last, c))

        if i == finish,
          do: {[finish - start + 1 | parts], i + 1, finish},
          else: {parts, start, finish}
      end)

    Enum.reverse(parts)
  end
end
