defmodule Solution do
  def spiral_order([]), do: []

  # Four boundaries closing in. Each side is walked and then retired, and the
  # two guards below are the ones everybody forgets: on a single remaining row
  # or column the bottom and top edges are the same edge, so walking both would
  # emit it twice.
  def spiral_order(matrix) do
    rows = List.to_tuple(Enum.map(matrix, &List.to_tuple/1))
    walk(rows, 0, length(matrix) - 1, 0, length(hd(matrix)) - 1, [])
  end

  defp walk(_rows, top, bottom, left, right, acc) when top > bottom or left > right,
    do: Enum.reverse(acc)

  defp walk(rows, top, bottom, left, right, acc) do
    acc = Enum.reduce(left..right//1, acc, fn c, acc -> [at(rows, top, c) | acc] end)

    acc =
      if top + 1 <= bottom,
        do: Enum.reduce((top + 1)..bottom//1, acc, fn r, acc -> [at(rows, r, right) | acc] end),
        else: acc

    acc =
      if top < bottom and left <= right - 1,
        do:
          Enum.reduce((right - 1)..left//-1, acc, fn c, acc -> [at(rows, bottom, c) | acc] end),
        else: acc

    acc =
      if left < right and top + 1 <= bottom - 1,
        do:
          Enum.reduce((bottom - 1)..(top + 1)//-1, acc, fn r, acc -> [at(rows, r, left) | acc] end),
        else: acc

    walk(rows, top + 1, bottom - 1, left + 1, right - 1, acc)
  end

  defp at(rows, r, c), do: rows |> elem(r) |> elem(c)
end
