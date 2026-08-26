defmodule Solution do
  # Every element is either in or out, independently, so the subsets of a list
  # are the subsets of its tail twice over: once with the head added and once
  # without. That is the whole recursion, and it is why there are 2^n of them.
  def subsets([]), do: [[]]

  def subsets([first | rest]) do
    without = subsets(rest)
    Enum.map(without, &[first | &1]) ++ without
  end
end
