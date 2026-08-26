defmodule Solution do
  def can_complete_circuit([], _cost), do: -1

  # Two facts do all the work. If the total gas is short of the total cost no
  # start works at all; and if the tank runs dry between i and j, no station in
  # between can start either, so the search jumps straight to j + 1 rather than
  # restarting.
  def can_complete_circuit(gas, cost) do
    {total, _tank, start} =
      gas
      |> Enum.zip(cost)
      |> Enum.with_index()
      |> Enum.reduce({0, 0, 0}, fn {{g, c}, i}, {total, tank, start} ->
        diff = g - c
        tank = tank + diff
        if tank < 0, do: {total + diff, 0, i + 1}, else: {total + diff, tank, start}
      end)

    if total >= 0, do: start, else: -1
  end
end
