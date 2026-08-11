defmodule Solution do
  def inclusion?(s1, s2) do
    need = s1 |> String.graphemes() |> Enum.frequencies()
    size = String.length(s1)
    graphemes = String.graphemes(s2)

    if size > length(graphemes) do
      false
    else
      slide(graphemes, Enum.drop(graphemes, size),
            graphemes |> Enum.take(size) |> Enum.frequencies(), need)
    end
  end

  defp slide(_oldest, _upcoming, window, need) when window == need, do: true
  defp slide(_oldest, [], _window, _need), do: false

  defp slide([out | oldest], [into | upcoming], window, need) do
    window =
      window
      |> Map.update!(out, &(&1 - 1))
      |> then(fn counts -> if counts[out] == 0, do: Map.delete(counts, out), else: counts end)
      |> Map.update(into, 1, &(&1 + 1))

    slide(oldest, upcoming, window, need)
  end
end
