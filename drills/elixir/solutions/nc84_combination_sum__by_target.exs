defmodule Solution do
  # Bottom-up instead of by recursion: the combinations making a target are
  # every combination making a smaller amount with one more candidate added.
  # Requiring each added candidate to be no smaller than the combination's
  # largest is what keeps one combination from appearing in several orders.
  def combination_sum(candidates, target) do
    usable = candidates |> Enum.filter(&(&1 > 0)) |> Enum.sort()

    table =
      Enum.reduce(1..target//1, %{0 => [[]]}, fn amount, acc ->
        found =
          Enum.flat_map(usable, fn candidate ->
            if candidate > amount do
              []
            else
              acc
              |> Map.get(amount - candidate, [])
              |> Enum.filter(fn
                [] -> true
                [largest | _] -> candidate >= largest
              end)
              |> Enum.map(&[candidate | &1])
            end
          end)

        Map.put(acc, amount, found)
      end)

    Map.get(table, target, [])
  end
end
