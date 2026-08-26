defmodule Solution do
  def generate_parenthesis(n), do: compose(n)

  # Every non-empty balanced string is "(" <> a <> ")" <> b for exactly one
  # split: a is whatever the first bracket encloses, b is whatever follows it.
  # Enumerating the splits enumerates the strings, with no validity rule to
  # check at all.
  defp compose(n) when n <= 0, do: [""]

  defp compose(n) do
    for inner <- 0..(n - 1),
        a <- compose(inner),
        b <- compose(n - 1 - inner),
        do: "(" <> a <> ")" <> b
  end
end
