defmodule Solution do
  # `lower` is the smaller half, largest first; `upper` is the larger half,
  # smallest first. The median is always at one or both of those two heads --
  # each half only ever has to give up its extreme value, which is exactly what
  # a pair of heaps provides. Sorted lists here: same invariant, worse insert.
  def new, do: {[], []}

  def add_num({lower, upper}, value) do
    rebalance({Enum.sort([value | lower], :desc), upper})
  end

  def find_median({[], []}), do: 0.0
  def find_median({[low | _], []}), do: low / 1
  def find_median({[], [high | _]}), do: high / 1

  def find_median({[low | _] = lower, [high | _] = upper}) do
    if length(lower) == length(upper), do: (low + high) / 2, else: low / 1
  end

  # The smaller half may hold one more than the larger half, never fewer, and
  # its largest must not exceed the larger half's smallest.
  defp rebalance({[low | lower_rest], [high | _] = upper}) when low > high do
    rebalance({lower_rest, Enum.sort([low | upper])})
  end

  defp rebalance({lower, upper}) do
    cond do
      length(lower) - length(upper) > 1 ->
        [low | rest] = lower
        rebalance({rest, Enum.sort([low | upper])})

      length(upper) > length(lower) ->
        [high | rest] = upper
        rebalance({Enum.sort([high | lower], :desc), rest})

      true ->
        {lower, upper}
    end
  end
end
