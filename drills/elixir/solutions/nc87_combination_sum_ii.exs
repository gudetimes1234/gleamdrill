defmodule Solution do
  def combination_sum2(candidates, target), do: build(Enum.sort(candidates), target)

  # Each candidate is used at most once, so taking one moves past it. The
  # duplicate rule is the same as in Subsets II: skipping a value means skipping
  # every copy of it, otherwise the same combination is rebuilt from a different
  # copy of the same number.
  defp build(_sorted, 0), do: [[]]
  defp build([], _target), do: []

  defp build([first | rest], target) do
    if first > target do
      []
    else
      Enum.map(build(rest, target - first), &[first | &1]) ++
        build(Enum.drop_while(rest, &(&1 == first)), target)
    end
  end
end
