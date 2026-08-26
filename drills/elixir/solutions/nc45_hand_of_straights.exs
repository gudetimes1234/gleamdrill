defmodule Solution do
  def is_n_straight_hand(hand, group_size)
      when group_size <= 0 or rem(length(hand), max(group_size, 1)) != 0,
      do: false

  def is_n_straight_hand(hand, group_size) do
    counts = Enum.frequencies(hand)

    # The smallest card left has no smaller neighbour to hide behind, so
    # whatever group it belongs to must start with it. That removes all choice,
    # which is what makes the greedy correct -- and every copy of it needs its
    # own group, so they are all taken at once.
    counts
    |> Map.keys()
    |> Enum.sort()
    |> Enum.reduce_while(counts, fn smallest, counts ->
      case Map.get(counts, smallest, 0) do
        0 -> {:cont, counts}
        copies -> take_run(counts, smallest, group_size, copies)
      end
    end)
    |> case do
      :impossible -> false
      _counts -> true
    end
  end

  defp take_run(counts, from, remaining, copies) do
    Enum.reduce_while(from..(from + remaining - 1)//1, counts, fn card, counts ->
      available = Map.get(counts, card, 0)

      if available < copies,
        do: {:halt, :impossible},
        else: {:cont, Map.put(counts, card, available - copies)}
    end)
    |> case do
      :impossible -> {:halt, :impossible}
      counts -> {:cont, counts}
    end
  end
end
