defmodule Solution do
  # Row j counts the ways to build the first j characters of t out of the source
  # seen so far. A new source character can extend a count at j-1 into one at j,
  # but only if it matches t[j-1].
  #
  # In an array version this row has to be swept right to left, or an update at
  # j-1 feeds straight into j and the same source character gets used twice.
  # Building a fresh row from the old one removes the hazard entirely, which is
  # worth noticing: the direction was never part of the recurrence.
  def num_distinct(s, t) do
    target = String.graphemes(t)

    s
    |> String.graphemes()
    |> Enum.reduce([1 | List.duplicate(0, length(target))], fn from_s, row ->
      extend(row, target, from_s)
    end)
    |> List.last()
  end

  defp extend(row, target, from_s) do
    [
      1
      | target
        |> Enum.with_index()
        |> Enum.map(fn {from_t, j} ->
          if from_s == from_t,
            do: Enum.at(row, j + 1) + Enum.at(row, j),
            else: Enum.at(row, j + 1)
        end)
    ]
  end
end
