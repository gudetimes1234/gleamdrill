defmodule Solution do
  # The longest subsequence ending at each position: one plus the best of every
  # earlier position holding a smaller value. Building the answers in order
  # means every "earlier position" is already known.
  def length_of_lis(nums) do
    {_endings, best} =
      Enum.reduce(nums, {[], 0}, fn n, {endings, best} ->
        here =
          endings
          |> Enum.filter(fn {value, _length} -> value < n end)
          |> Enum.map(fn {_value, length} -> length end)
          |> Enum.max(fn -> 0 end)
          |> Kernel.+(1)

        {[{n, here} | endings], max(best, here)}
      end)

    best
  end
end
