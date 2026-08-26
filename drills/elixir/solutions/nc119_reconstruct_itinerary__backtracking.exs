defmodule Solution do
  # Every ticket used, smallest option first, undoing a choice that leads
  # nowhere. Because the options are sorted, the first complete itinerary found
  # is the smallest one -- no comparing of candidates. Exponential in the worst
  # case, which is what Hierholzer's one-pass walk removes.
  def find_itinerary(tickets) do
    destinations =
      tickets
      |> Enum.reduce(%{}, fn [origin, destination], acc ->
        Map.update(acc, origin, [destination], &[destination | &1])
      end)
      |> Map.new(fn {origin, options} -> {origin, Enum.sort(options)} end)

    case extend(destinations, "JFK", ["JFK"], length(tickets)) do
      nil -> []
      route -> Enum.reverse(route)
    end
  end

  defp extend(_destinations, _airport, route, 0), do: route

  defp extend(destinations, airport, route, remaining) do
    options = Map.get(destinations, airport, [])

    options
    |> Enum.with_index()
    |> Enum.find_value(fn {next, i} ->
      left = List.delete_at(options, i)

      extend(
        Map.put(destinations, airport, left),
        next,
        [next | route],
        remaining - 1
      )
    end)
  end
end
