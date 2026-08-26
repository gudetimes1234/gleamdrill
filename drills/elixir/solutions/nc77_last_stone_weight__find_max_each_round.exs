defmodule Solution do
  # No ordering kept at all: scan for the heaviest, remove it, scan again. O(n)
  # per round against the sorted version's O(n log n) once -- worse overall, but
  # it makes clear that the only operation the problem needs is "give me the
  # largest", which is exactly the interface a heap provides.
  def last_stone_weight(stones), do: smash(stones)

  defp smash([]), do: 0
  defp smash([only]), do: only

  defp smash(stones) do
    heaviest = Enum.max(stones)
    rest = List.delete(stones, heaviest)
    next = Enum.max(rest)
    remaining = List.delete(rest, next)

    case heaviest - next do
      0 -> smash(remaining)
      remainder -> smash([remainder | remaining])
    end
  end
end
