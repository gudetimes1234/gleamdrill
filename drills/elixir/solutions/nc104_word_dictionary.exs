defmodule Solution do
  def new, do: %{children: %{}, terminal: false}

  def add_word(store, word), do: add(store, String.graphemes(word))

  # A dot has to try every child, which turns the lookup from a walk into a
  # search -- the trie is what keeps that search from being over every word,
  # because a branch that cannot match is abandoned at the first letter.
  def search(store, word), do: matches(store, String.graphemes(word))

  defp add(store, []), do: %{store | terminal: true}

  defp add(store, [first | rest]) do
    child = Map.get(store.children, first, new())
    %{store | children: Map.put(store.children, first, add(child, rest))}
  end

  defp matches(store, []), do: store.terminal

  defp matches(store, ["." | rest]) do
    Enum.any?(Map.values(store.children), &matches(&1, rest))
  end

  defp matches(store, [first | rest]) do
    case Map.fetch(store.children, first) do
      {:ok, child} -> matches(child, rest)
      :error -> false
    end
  end
end
