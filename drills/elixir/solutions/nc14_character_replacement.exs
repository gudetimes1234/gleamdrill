defmodule Solution do
  def character_replacement(s, k) do
    {_counts, _window, best} =
      s
      |> String.graphemes()
      |> Enum.reduce({%{}, [], 0}, fn g, {counts, window, best} ->
        counts = Map.update(counts, g, 1, &(&1 + 1))
        {counts, window} = shrink(counts, window ++ [g], k)
        {counts, window, max(best, length(window))}
      end)

    best
  end

  # The window is legal while everything that is not the commonest character
  # fits inside the k replacements.
  defp shrink(counts, window, k) do
    commonest = counts |> Map.values() |> Enum.max(fn -> 0 end)

    if length(window) - commonest > k do
      [oldest | rest] = window
      shrink(Map.update!(counts, oldest, &(&1 - 1)), rest, k)
    else
      {counts, window}
    end
  end
end
