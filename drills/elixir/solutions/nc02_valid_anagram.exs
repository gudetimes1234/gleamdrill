defmodule Solution do
  def anagram?(s, t) do
    frequencies(s) == frequencies(t)
  end

  defp frequencies(word) do
    word |> String.graphemes() |> Enum.frequencies()
  end
end
