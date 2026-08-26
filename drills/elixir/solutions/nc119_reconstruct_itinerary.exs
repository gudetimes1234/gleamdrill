defmodule Solution do
  # Hierholzer's algorithm. Take the smallest unused ticket every time and never
  # look back: an airport is only recorded once it has no tickets left, so the
  # dead end the greedy choice walks into is exactly where the route has to
  # *end*, and it lands at the front of the answer by being recorded first.
  def find_itinerary(tickets) do
    destinations =
      tickets
      |> Enum.reduce(%{}, fn [origin, destination], acc ->
        Map.update(acc, origin, [destination], &[destination | &1])
      end)
      |> Map.new(fn {origin, options} -> {origin, Enum.sort(options)} end)

    {_left, route} = walk(destinations, "JFK", [])
    route
  end

  defp walk(destinations, airport, route) do
    case Map.get(destinations, airport, []) do
      [next | rest] ->
        {destinations, route} =
          walk(Map.put(destinations, airport, rest), next, route)

        walk(destinations, airport, route)

      [] ->
        {destinations, [airport | route]}
    end
  end
end
