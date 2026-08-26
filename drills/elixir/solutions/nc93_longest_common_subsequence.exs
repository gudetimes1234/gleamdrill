defmodule Solution do
  # Compare the last characters: equal means both are used and the answer is one
  # more than the rest, different means the best of dropping one or the other.
  # Filled row by row, only the previous row is ever needed.
  def longest_common_subsequence(text1, text2) do
    b = String.graphemes(text2)

    text1
    |> String.graphemes()
    |> Enum.reduce(List.duplicate(0, length(b) + 1), fn a, previous ->
      row(previous, b, a)
    end)
    |> List.last()
  end

  defp row(previous, b, a) do
    {built, _} =
      Enum.reduce(b, {[0], {previous, 0}}, fn from_b, {built, {remaining, left}} ->
        {diagonal, above} =
          case remaining do
            [d, above | _] -> {d, above}
            [d] -> {d, 0}
            [] -> {0, 0}
          end

        here = if a == from_b, do: diagonal + 1, else: max(above, left)
        {[here | built], {tl(remaining), here}}
      end)

    Enum.reverse(built)
  end
end
