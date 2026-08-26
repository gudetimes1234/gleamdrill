defmodule Solution do
  def is_n_straight_hand(hand, group_size)
      when group_size <= 0 or rem(length(hand), max(group_size, 1)) != 0,
      do: false

  # No counts: sort, then peel one full run off the front at a time, removing
  # each card as it is used. Slower -- every removal is a list walk -- but the
  # only thing to believe is that a group must begin with the smallest card
  # left.
  def is_n_straight_hand(hand, group_size), do: build(Enum.sort(hand), group_size)

  defp build([], _group_size), do: true

  defp build([smallest | _] = cards, group_size) do
    case peel(cards, smallest, group_size) do
      :impossible -> false
      remaining -> build(remaining, group_size)
    end
  end

  defp peel(cards, _wanted, 0), do: cards

  defp peel(cards, wanted, remaining) do
    if wanted in cards,
      do: peel(List.delete(cards, wanted), wanted + 1, remaining - 1),
      else: :impossible
  end
end
