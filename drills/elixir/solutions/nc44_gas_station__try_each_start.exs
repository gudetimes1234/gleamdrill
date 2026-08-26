defmodule Solution do
  # Drive the whole loop from each start and see whether the tank ever goes
  # negative. O(n^2) -- the definition, and what the single pass replaces.
  def can_complete_circuit(gas, cost) do
    diffs = gas |> Enum.zip(cost) |> Enum.map(fn {g, c} -> g - c end)

    Enum.find(0..(length(diffs) - 1)//1, -1, fn start ->
      survives?(Enum.drop(diffs, start) ++ Enum.take(diffs, start))
    end)
  end

  defp survives?(rotated) do
    Enum.reduce_while(rotated, 0, fn diff, tank ->
      if tank + diff < 0, do: {:halt, :dry}, else: {:cont, tank + diff}
    end) != :dry
  end
end
