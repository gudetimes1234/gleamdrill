defmodule Solution do
  def is_match(s, p), do: matches(String.graphemes(s), String.graphemes(p))

  # The same rules with no table at all -- just pattern matching on the two
  # lists. Shorter and easier to trust, and exponential on patterns like
  # "a*a*a*a*b" where the same suffix is reached along many different splits.
  # Worth writing first, then adding the cache once it is right.
  defp matches(text, []), do: text == []

  defp matches(text, [symbol, "*" | rest]) do
    matches(text, rest) or
      case text do
        [first | tail] when first == symbol or symbol == "." ->
          matches(tail, [symbol, "*" | rest])

        _ ->
          false
      end
  end

  defp matches([first | tail], [symbol | rest]) when first == symbol or symbol == ".",
    do: matches(tail, rest)

  defp matches(_text, _pattern), do: false
end
