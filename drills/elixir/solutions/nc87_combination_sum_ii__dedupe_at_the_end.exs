defmodule Solution do
  # Generate every subset that hits the target and collapse the repeats
  # afterwards. Correct, and exponentially wasteful on inputs with many equal
  # values -- which is exactly why the skipping rule is worth getting right.
  def combination_sum2(candidates, target) do
    candidates
    |> Enum.sort()
    |> every_subset()
    |> Enum.filter(&(Enum.sum(&1) == target))
    |> Enum.uniq()
  end

  defp every_subset([]), do: [[]]

  defp every_subset([first | rest]) do
    without = every_subset(rest)
    Enum.map(without, &[first | &1]) ++ without
  end
end
