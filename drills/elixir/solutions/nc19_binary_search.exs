defmodule Solution do
  def search(nums, target) do
    halve(List.to_tuple(nums), target, 0, length(nums) - 1)
  end

  defp halve(_tuple, _target, low, high) when low > high, do: nil

  defp halve(tuple, target, low, high) do
    mid = div(low + high, 2)

    case elem(tuple, mid) do
      ^target -> mid
      value when value < target -> halve(tuple, target, mid + 1, high)
      _ -> halve(tuple, target, low, mid - 1)
    end
  end
end
