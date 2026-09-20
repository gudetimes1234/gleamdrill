defmodule Solution do
  def top_k_frequent(nums, k) do
    buckets =
      nums
      |> Enum.frequencies()
      |> Enum.group_by(fn {_num, count} -> count end, fn {num, _count} -> num end)

    length(nums)..1//-1
    |> Enum.flat_map(fn count -> Map.get(buckets, count, []) end)
    |> Enum.take(k)
  end
end
