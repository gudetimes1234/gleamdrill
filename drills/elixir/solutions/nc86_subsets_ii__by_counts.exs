defmodule Solution do
  # A different framing: the answer is not a choice per *element* but a choice
  # per distinct *value* -- how many copies of it to take, from none up to
  # however many there are. Duplicates then cannot arise at all, so there is no
  # skipping rule to remember.
  def subsets_with_dup(nums) do
    nums
    |> Enum.frequencies()
    |> Enum.sort()
    |> Enum.reduce([[]], fn {value, count}, subsets ->
      for subset <- subsets,
          taken <- 0..count//1,
          do: subset ++ List.duplicate(value, taken)
    end)
  end
end
