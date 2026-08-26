defmodule Solution do
  def anagram?(s, t) do
    sorted(s) == sorted(t)
  end

  defp sorted(word), do: word |> String.graphemes() |> Enum.sort()
end
