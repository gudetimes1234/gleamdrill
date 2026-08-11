defmodule Solution do
  def length_of_longest_substring(s) do
    # The window itself is the bookkeeping: on a repeat, drop everything up to
    # and including the earlier copy. No last-seen map at all.
    {_window, best} =
      s
      |> String.graphemes()
      |> Enum.reduce({[], 0}, fn g, {window, best} ->
        window = if g in window, do: drop_through(window, g), else: window
        window = window ++ [g]
        {window, max(best, length(window))}
      end)

    best
  end

  defp drop_through([g | rest], g), do: rest
  defp drop_through([_other | rest], g), do: drop_through(rest, g)
  defp drop_through([], _g), do: []
end
