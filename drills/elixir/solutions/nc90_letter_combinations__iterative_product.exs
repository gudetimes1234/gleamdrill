defmodule Solution do
  @keypad %{
    "2" => "abc", "3" => "def", "4" => "ghi", "5" => "jkl",
    "6" => "mno", "7" => "pqrs", "8" => "tuv", "9" => "wxyz"
  }

  def letter_combinations(""), do: []

  # The same cross product built by folding rather than recursing: hold every
  # combination of the digits seen so far and extend each by every letter of the
  # next. No call stack, and the growth is visible -- the list multiplies in
  # size at each step.
  def letter_combinations(digits) do
    digits
    |> String.graphemes()
    |> Enum.reduce([""], fn digit, combinations ->
      for prefix <- combinations,
          letter <- @keypad |> Map.get(digit, "") |> String.graphemes(),
          do: prefix <> letter
    end)
  end
end
