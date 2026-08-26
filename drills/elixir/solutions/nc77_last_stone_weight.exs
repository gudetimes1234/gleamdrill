defmodule Solution do
  # Always the two heaviest, so the collection has to give up its maximum over
  # and over -- which is what a heap is for. Kept sorted descending here, so the
  # two heaviest are the first two and the remainder goes back in order.
  def last_stone_weight(stones), do: smash(Enum.sort(stones, :desc))

  defp smash([]), do: 0
  defp smash([only]), do: only

  defp smash([heaviest, next | rest]) do
    case heaviest - next do
      0 -> smash(rest)
      remainder -> smash(Enum.sort([remainder | rest], :desc))
    end
  end
end
