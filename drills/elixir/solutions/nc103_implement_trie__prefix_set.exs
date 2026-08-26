defmodule Solution do
  # Two sets: the whole words, and every prefix of every word. Both questions
  # then answer in one lookup, at the cost of storing O(total letters) strings
  # rather than sharing them -- which is precisely the memory a trie exists to
  # save. The empty prefix is present from the start: it is the root.
  def new, do: %{words: MapSet.new(), prefixes: MapSet.new([""])}

  def insert(trie, word) do
    prefixes =
      Enum.reduce(0..String.length(word)//1, trie.prefixes, fn size, acc ->
        MapSet.put(acc, String.slice(word, 0, size))
      end)

    %{words: MapSet.put(trie.words, word), prefixes: prefixes}
  end

  def search(trie, word), do: MapSet.member?(trie.words, word)

  def starts_with(trie, prefix), do: MapSet.member?(trie.prefixes, prefix)
end
