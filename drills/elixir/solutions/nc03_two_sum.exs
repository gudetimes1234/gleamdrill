defmodule Solution do
  def two_sum(nums, target) do
    find_pair(Enum.with_index(nums), target, %{})
  end

  defp find_pair([], _target, _seen), do: nil

  defp find_pair([{n, i} | rest], target, seen) do
    # Every earlier number is in `seen`, so the complement is one lookup away.
    case Map.fetch(seen, target - n) do
      {:ok, j} -> {j, i}
      :error -> find_pair(rest, target, Map.put(seen, n, i))
    end
  end
end
