defmodule Solution do
  def longest_consecutive(nums) do
    # No set: sort, then fold once over the gaps. O(n log n) rather than O(n),
    # but the run logic reads straight through.
    case Enum.sort(nums) do
      [] ->
        0

      [first | rest] ->
        {_previous, _run, best} =
          Enum.reduce(rest, {first, 1, 1}, fn n, {previous, run, best} ->
            case n - previous do
              0 -> {previous, run, best}
              1 -> {n, run + 1, max(best, run + 1)}
              _ -> {n, 1, best}
            end
          end)

        best
    end
  end
end
