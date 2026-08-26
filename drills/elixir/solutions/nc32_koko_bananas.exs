defmodule Solution do
  def min_eating_speed(piles, h), do: search(piles, h, 1, Enum.max(piles))

  # The search space is the answer, not the input. Feasibility is monotone -- if
  # a speed finishes in time then so does every faster one -- which is exactly
  # the property halving needs.
  defp search(_piles, _h, low, high) when low >= high, do: low

  defp search(piles, h, low, high) do
    mid = div(low + high, 2)

    if hours(piles, mid) <= h,
      do: search(piles, h, low, mid),
      else: search(piles, h, mid + 1, high)
  end

  # A pile never shares an hour with another, so each costs ceil(pile / speed).
  defp hours(piles, speed) do
    Enum.reduce(piles, 0, fn pile, total -> total + div(pile + speed - 1, speed) end)
  end
end
