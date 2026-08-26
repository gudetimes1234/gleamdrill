defmodule Solution do
  # Reachable positions rather than a table of booleans: start at 0, and a
  # position is reachable when some word in the dictionary bridges the gap from
  # a position already reached.
  def word_break(s, word_dict) do
    words = MapSet.new(word_dict)
    n = String.length(s)

    reached =
      Enum.reduce(1..n//1, MapSet.new([0]), fn finish, reached ->
        bridged =
          Enum.any?(0..(finish - 1)//1, fn start ->
            MapSet.member?(reached, start) and
              MapSet.member?(words, String.slice(s, start, finish - start))
          end)

        if bridged, do: MapSet.put(reached, finish), else: reached
      end)

    MapSet.member?(reached, n)
  end
end
