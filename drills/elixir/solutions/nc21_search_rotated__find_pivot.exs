defmodule Solution do
  def search_rotated(nums, target) do
    tuple = List.to_tuple(nums)
    pivot = rotation_point(nums)
    size = tuple_size(tuple)

    case search(tuple, target, 0, pivot - 1) do
      nil -> search(tuple, target, pivot, size - 1)
      index -> index
    end
  end

  defp rotation_point([]), do: 0

  defp rotation_point([head | rest]) do
    rest
    |> Enum.with_index(1)
    |> Enum.reduce_while({head, 0}, fn {n, i}, {previous, _pivot} ->
      if n < previous, do: {:halt, {n, i}}, else: {:cont, {n, 0}}
    end)
    |> elem(1)
  end

  defp search(_tuple, _target, low, high) when low > high, do: nil

  defp search(tuple, target, low, high) do
    mid = div(low + high, 2)

    case elem(tuple, mid) do
      ^target -> mid
      value when value < target -> search(tuple, target, mid + 1, high)
      _ -> search(tuple, target, low, mid - 1)
    end
  end
end
