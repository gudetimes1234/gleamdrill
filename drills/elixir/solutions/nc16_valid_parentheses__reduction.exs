defmodule Solution do
  def valid?(s) do
    # No stack: strip every matched pair, over and over. Whatever survives is
    # unmatched — which is also why "([)]" fails, since neither pair is ever
    # adjacent.
    reduce(s) == ""
  end

  defp reduce(s) do
    smaller = s |> String.replace("()", "") |> String.replace("[]", "") |> String.replace("{}", "")
    if smaller == s, do: s, else: reduce(smaller)
  end
end
