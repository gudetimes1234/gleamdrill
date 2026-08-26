defmodule Solution do
  # Build up from zero: the cheapest way to make a target is one coin more than
  # the cheapest way to make what is left after removing some coin. An amount
  # with no entry is simply unreachable, which saves inventing a sentinel for
  # infinity.
  def coin_change(coins, amount) do
    table =
      Enum.reduce(1..amount//1, %{0 => 0}, fn target, acc ->
        options =
          coins
          |> Enum.filter(&(&1 <= target))
          |> Enum.flat_map(fn coin ->
            case Map.fetch(acc, target - coin) do
              {:ok, fewest} -> [fewest]
              :error -> []
            end
          end)

        if options == [], do: acc, else: Map.put(acc, target, Enum.min(options) + 1)
      end)

    Map.get(table, amount, -1)
  end
end
