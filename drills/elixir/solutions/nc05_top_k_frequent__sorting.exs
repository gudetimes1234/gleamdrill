defmodule Solution do
  def top_k_frequent(nums, k) do
    nums
    |> Enum.frequencies()
    |> Enum.sort_by(fn {_num, count} -> count end, :desc)
    |> Enum.take(k)
    |> Enum.map(fn {num, _count} -> num end)
  end
end
