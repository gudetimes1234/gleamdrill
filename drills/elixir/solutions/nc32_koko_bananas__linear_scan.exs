defmodule Solution do
  def min_eating_speed(piles, h), do: climb(piles, h, 1, Enum.max(piles))

  defp climb(piles, h, speed, highest) do
    if speed >= highest or hours(piles, speed) <= h,
      do: speed,
      else: climb(piles, h, speed + 1, highest)
  end

  defp hours(piles, speed) do
    Enum.reduce(piles, 0, fn pile, total -> total + div(pile + speed - 1, speed) end)
  end
end
