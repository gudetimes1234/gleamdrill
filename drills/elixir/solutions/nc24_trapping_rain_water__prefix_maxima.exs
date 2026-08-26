defmodule Solution do
  def trap(height) do
    left = running_max(height)
    right = height |> Enum.reverse() |> running_max() |> Enum.reverse()

    [left, right, height]
    |> Enum.zip_with(fn [l, r, h] -> min(l, r) - h end)
    |> Enum.sum()
  end

  defp running_max(values), do: Enum.scan(values, 0, &max/2)
end
