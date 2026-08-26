defmodule Solution do
  # Bellman-Ford, stopped after k+1 rounds -- one round is one flight, so the
  # round count *is* the stop limit. Each round reads the previous round's costs
  # from a snapshot rather than from the table being written; without that, two
  # flights could be taken within a single round and the limit would leak.
  def find_cheapest_price(_n, flights, src, dst, k) do
    costs =
      Enum.reduce(0..k//1, %{src => 0}, fn _round, costs ->
        previous = costs

        Enum.reduce(flights, costs, fn [origin, destination, price], costs ->
          case Map.fetch(previous, origin) do
            {:ok, spent} ->
              total = spent + price

              if total < Map.get(costs, destination, total + 1),
                do: Map.put(costs, destination, total),
                else: costs

            :error ->
              costs
          end
        end)
      end)

    Map.get(costs, dst, -1)
  end
end
