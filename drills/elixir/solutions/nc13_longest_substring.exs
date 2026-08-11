defmodule Solution do
  def length_of_longest_substring(s) do
    {_last_seen, _start, best} =
      s
      |> String.graphemes()
      |> Enum.with_index()
      |> Enum.reduce({%{}, 0, 0}, fn {g, i}, {last_seen, start, best} ->
        # A repeat inside the window moves the window past the earlier copy.
        start =
          case Map.fetch(last_seen, g) do
            {:ok, j} when j >= start -> j + 1
            _ -> start
          end

        {Map.put(last_seen, g, i), start, max(best, i - start + 1)}
      end)

    best
  end
end
