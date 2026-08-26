defmodule Solution do
  # Combinations, not permutations -- which is entirely decided by the loop
  # order. Coins on the outside means each coin is considered once and for all
  # before the next is looked at, so 1+2 and 2+1 can never both be counted.
  # Swapping the loops would count orderings instead.
  def change(amount, coins) do
    coins
    |> Enum.filter(&(&1 > 0))
    |> Enum.reduce(%{0 => 1}, fn coin, ways ->
      if coin > amount do
        ways
      else
        Enum.reduce(coin..amount//1, ways, fn target, ways ->
          Map.put(ways, target, Map.get(ways, target, 0) + Map.get(ways, target - coin, 0))
        end)
      end
    end)
    |> Map.get(amount, 0)
  end
end
