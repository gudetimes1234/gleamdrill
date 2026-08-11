defmodule Solution do
  def anagram?(s, t) do
    # Two words are anagrams exactly when their sorted letters match.
    sorted(s) == sorted(t)
  end

  defp sorted(word), do: word |> String.graphemes() |> Enum.sort()
end
