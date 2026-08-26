defmodule Solution do
  def num_decodings(""), do: 0

  # Two rolling counts. The ways to decode up to here are the ways up to the
  # previous character (if this one can stand alone) plus the ways up to the one
  # before that (if this one and its predecessor form a legal pair). A leading
  # zero kills the first branch; anything outside 10..26 kills the second.
  def num_decodings(s) do
    {_two_back, ways, _previous} =
      s
      |> String.graphemes()
      |> Enum.with_index()
      |> Enum.reduce({1, 1, ""}, fn {c, i}, {two_back, one_back, previous} ->
        alone = if c == "0", do: 0, else: one_back
        paired = if i > 0 and legal_pair?(previous, c), do: two_back, else: 0
        {one_back, alone + paired, c}
      end)

    ways
  end

  defp legal_pair?(first, second) do
    value = String.to_integer(first <> second)
    value >= 10 and value <= 26
  end
end
