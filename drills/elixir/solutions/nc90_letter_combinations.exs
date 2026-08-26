defmodule Solution do
  @keypad %{
    "2" => "abc", "3" => "def", "4" => "ghi", "5" => "jkl",
    "6" => "mno", "7" => "pqrs", "8" => "tuv", "9" => "wxyz"
  }

  def letter_combinations(""), do: []
  def letter_combinations(digits), do: build(String.graphemes(digits))

  # One choice per digit, independently -- so the answer is the cross product of
  # the letter sets. Written as a recursion here: pick a letter for the first
  # digit, then every combination of the rest.
  defp build([]), do: [""]

  defp build([first | rest]) do
    tails = build(rest)

    for letter <- @keypad |> Map.get(first, "") |> String.graphemes(),
        tail <- tails,
        do: letter <> tail
  end
end
