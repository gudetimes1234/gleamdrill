defmodule Solution do
  def find_min([]), do: nil

  def find_min(nums) do
    tuple = List.to_tuple(nums)
    narrow(tuple, 0, tuple_size(tuple) - 1)
  end

  defp narrow(tuple, low, high) when low >= high, do: elem(tuple, low)

  defp narrow(tuple, low, high) do
    mid = div(low + high, 2)

    # Anything past a value larger than the last element is still on the high
    # side of the rotation.
    if elem(tuple, mid) > elem(tuple, high) do
      narrow(tuple, mid + 1, high)
    else
      narrow(tuple, low, mid)
    end
  end
end
