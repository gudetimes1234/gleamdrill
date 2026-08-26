defmodule Solution do
  # Breadth-first by number of flights taken, which makes the stop limit the
  # depth limit -- the same bound Bellman-Ford gets from its round count. The
  # cheapest-so-far table is what stops it exploding: a city is only expanded
  # again if this route reached it for less than any earlier one did.
  def find_cheapest_price(_n, flights, src, dst, k) do
    outgoing =
      Enum.reduce(flights, %{}, fn [origin, destination, price], acc ->
        Map.update(acc, origin, [{destination, price}], &[{destination, price} | &1])
      end)

    {best, _frontier} =
      Enum.reduce(0..k//1, {%{src => 0}, [{src, 0}]}, fn _round, {best, frontier} ->
        Enum.reduce(frontier, {best, []}, fn {city, spent}, acc ->
          outgoing
          |> Map.get(city, [])
          |> Enum.reduce(acc, fn {destination, price}, {best, following} ->
            total = spent + price

            if total < Map.get(best, destination, total + 1),
              do: {Map.put(best, destination, total), [{destination, total} | following]},
              else: {best, following}
          end)
        end)
      end)

    Map.get(best, dst, -1)
  end
end
