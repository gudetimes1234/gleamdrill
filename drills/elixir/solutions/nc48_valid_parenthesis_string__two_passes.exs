defmodule Solution do
  # Two one-sided checks. Left to right with every star an opener asks whether
  # there are ever too many closers; right to left with every star a closer asks
  # whether there are ever too many openers. Passing both is exactly the
  # condition, and each pass is the ordinary balance check.
  def check_valid_string(s) do
    graphemes = String.graphemes(s)
    never_negative?(graphemes, "(") and never_negative?(Enum.reverse(graphemes), ")")
  end

  defp never_negative?(graphemes, credit) do
    Enum.reduce_while(graphemes, 0, fn c, balance ->
      balance = if c == credit or c == "*", do: balance + 1, else: balance - 1
      if balance < 0, do: {:halt, :negative}, else: {:cont, balance}
    end) != :negative
  end
end
