defmodule Solution do
  def two_sum_sorted(numbers, target) do
    tuple = List.to_tuple(numbers)

    Enum.find_value(0..(tuple_size(tuple) - 1)//1, fn i ->
      case search(tuple, target - elem(tuple, i), i + 1, tuple_size(tuple) - 1) do
        nil -> nil
        j -> {i + 1, j + 1}
      end
    end)
  end

  defp search(_tuple, _wanted, low, high) when low > high, do: nil

  defp search(tuple, wanted, low, high) do
    mid = div(low + high, 2)

    case elem(tuple, mid) do
      ^wanted -> mid
      value when value < wanted -> search(tuple, wanted, mid + 1, high)
      _ -> search(tuple, wanted, low, mid - 1)
    end
  end
end
