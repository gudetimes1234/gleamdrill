defmodule Solution do
  def combination_sum(candidates, target), do: build(candidates, target)

  # Each step either takes the current candidate again -- reuse is allowed -- or
  # drops it for good. Never going back to a dropped candidate is what stops the
  # same combination appearing in several orders, so no deduplication is needed.
  defp build(_candidates, 0), do: [[]]
  defp build([], _target), do: []

  defp build([first | rest] = candidates, target) do
    if first > target or first <= 0 do
      build(rest, target)
    else
      Enum.map(build(candidates, target - first), &[first | &1]) ++ build(rest, target)
    end
  end
end
