defmodule Solution do
  def generate_parenthesis(n), do: Enum.reverse(build(n, n, "", []))

  # Two counters, one rule each: an opener is legal while any are left, and a
  # closer is legal only while more are outstanding than openers. Everything
  # reached with both at zero is valid by construction.
  defp build(0, 0, current, acc), do: [current | acc]

  defp build(open, close, current, acc) do
    acc = if open > 0, do: build(open - 1, close, current <> "(", acc), else: acc
    if close > open, do: build(open, close - 1, current <> ")", acc), else: acc
  end
end
