defmodule Solution do
  # One node per prefix; `terminal` marks the prefixes that are whole words.
  # Without that flag "app" and "apple" are indistinguishable once both are
  # stored, which is the entire difference between search and starts_with.
  def new, do: %{children: %{}, terminal: false}

  def insert(trie, word), do: add(trie, String.graphemes(word))

  def search(trie, word) do
    case walk(trie, String.graphemes(word)) do
      nil -> false
      node -> node.terminal
    end
  end

  def starts_with(trie, prefix), do: walk(trie, String.graphemes(prefix)) != nil

  defp add(trie, []), do: %{trie | terminal: true}

  defp add(trie, [first | rest]) do
    child = Map.get(trie.children, first, new())
    %{trie | children: Map.put(trie.children, first, add(child, rest))}
  end

  defp walk(trie, []), do: trie

  defp walk(trie, [first | rest]) do
    case Map.fetch(trie.children, first) do
      {:ok, child} -> walk(child, rest)
      :error -> nil
    end
  end
end
