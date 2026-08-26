defmodule Solution do
  import Bitwise

  # The in-or-out choices *are* the bits of a number, so counting from 0 to
  # 2^n - 1 enumerates every subset exactly once with no recursion at all.
  # Worth knowing: it also gives every subset a stable index, which matters when
  # subsets have to be compared or cached.
  def subsets(nums) do
    indexed = Enum.with_index(nums)

    for mask <- 0..((1 <<< length(nums)) - 1)//1 do
      for {value, i} <- indexed, (mask >>> i &&& 1) == 1, do: value
    end
  end
end
