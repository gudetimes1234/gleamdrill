defmodule Solution do
  # Rather than guessing what each star should be, carry the *range* of open
  # counts still possible: low if every star so far were a closer, high if every
  # one were an opener. High going negative means even the most generous reading
  # has too many closers; low is clamped at zero because a star can always be
  # nothing.
  def check_valid_string(s) do
    s
    |> String.graphemes()
    |> Enum.reduce_while({0, 0}, fn c, {low, high} ->
      {low, high} =
        case c do
          "(" -> {low + 1, high + 1}
          ")" -> {max(low - 1, 0), high - 1}
          _ -> {max(low - 1, 0), high + 1}
        end

      if high < 0, do: {:halt, :impossible}, else: {:cont, {low, high}}
    end)
    |> case do
      :impossible -> false
      {low, _high} -> low == 0
    end
  end
end
