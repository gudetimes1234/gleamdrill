defmodule Solution do
  # Two passes, and they cannot be one: writing a zero as you find it would be
  # indistinguishable from a zero that was already there, and the whole grid
  # would clear. So record which rows and columns are doomed first, then apply.
  def set_zeroes(matrix) do
    doomed =
      matrix
      |> Enum.with_index()
      |> Enum.flat_map(fn {row, r} ->
        row
        |> Enum.with_index()
        |> Enum.filter(fn {value, _c} -> value == 0 end)
        |> Enum.map(fn {_value, c} -> {r, c} end)
      end)

    rows = MapSet.new(doomed, fn {r, _c} -> r end)
    columns = MapSet.new(doomed, fn {_r, c} -> c end)

    matrix
    |> Enum.with_index()
    |> Enum.map(fn {row, r} ->
      row
      |> Enum.with_index()
      |> Enum.map(fn {value, c} ->
        if MapSet.member?(rows, r) or MapSet.member?(columns, c), do: 0, else: value
      end)
    end)
  end
end
