defmodule Solution do
  # Words bucketed by length. A pattern can only match words of its own length,
  # so that one check throws away most of the collection before any character is
  # compared.
  def new, do: %{}

  def add_word(store, word) do
    Map.update(store, String.length(word), [word], &[word | &1])
  end

  # No shared prefixes, so every candidate of the right length is compared
  # position by position. Slower than the trie on a large dictionary, and it
  # needs no tree -- which is the trade the trie is making.
  def search(store, word) do
    pattern = String.graphemes(word)

    store
    |> Map.get(String.length(word), [])
    |> Enum.any?(fn candidate ->
      pattern
      |> Enum.zip(String.graphemes(candidate))
      |> Enum.all?(fn {p, c} -> p == "." or p == c end)
    end)
  end
end
