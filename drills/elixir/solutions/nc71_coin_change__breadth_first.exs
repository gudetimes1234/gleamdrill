defmodule Solution do
  def coin_change(_coins, 0), do: 0

  # The amounts reachable with k coins form one level of a breadth-first search
  # from zero, so the first level containing the target is the answer. Same
  # bound as the table, but it stops the moment it arrives rather than filling
  # in every amount below the target.
  def coin_change(coins, amount), do: walk(coins, amount, [0], MapSet.new([0]), 0)

  defp walk(_coins, _amount, [], _seen, _used), do: -1

  defp walk(coins, amount, frontier, seen, used) do
    next =
      for total <- frontier, coin <- coins, total + coin <= amount, uniq: true do
        total + coin
      end

    if amount in next do
      used + 1
    else
      fresh = Enum.reject(next, &MapSet.member?(seen, &1))
      walk(coins, amount, fresh, MapSet.union(seen, MapSet.new(fresh)), used + 1)
    end
  end
end
