defmodule Solution do
  def alien_order(words) do
    letters =
      Enum.reduce(words, MapSet.new(), fn word, acc ->
        Enum.reduce(String.graphemes(word), acc, &MapSet.put(&2, &1))
      end)

    case edges(words) do
      :contradiction ->
        ""

      pairs ->
        waiting =
          Enum.reduce(pairs, Map.new(letters, &{&1, 0}), fn {_a, b}, acc ->
            Map.update!(acc, b, &(&1 + 1))
          end)

        unlocks =
          Enum.reduce(pairs, Map.new(letters, &{&1, []}), fn {a, b}, acc ->
            Map.update!(acc, a, &[b | &1])
          end)

        ready = for letter <- letters, Map.fetch!(waiting, letter) == 0, do: letter
        order = take(ready, waiting, unlocks, [])

        # Short means the leftovers all depend on each other: the ordering the
        # words describe is contradictory, so no alphabet satisfies it.
        if length(order) == MapSet.size(letters), do: Enum.join(order), else: ""
    end
  end

  # Two adjacent words agree up to their first difference, and that difference
  # is the only thing they say about the alphabet -- everything after it is
  # unordered. The one case with no letters to compare is a word followed by a
  # prefix of itself, which no alphabet can explain.
  defp edges(words) do
    words
    |> Enum.zip(Enum.drop(words, 1))
    |> Enum.reduce_while([], fn {first, second}, acc ->
      case difference(String.graphemes(first), String.graphemes(second)) do
        :contradiction -> {:halt, :contradiction}
        nil -> {:cont, acc}
        pair -> {:cont, [pair | acc]}
      end
    end)
  end

  defp difference([a | a_rest], [b | b_rest]) do
    if a == b, do: difference(a_rest, b_rest), else: {a, b}
  end

  defp difference([_ | _], []), do: :contradiction
  defp difference(_, _), do: nil

  defp take([], _waiting, _unlocks, order), do: Enum.reverse(order)

  defp take([letter | rest], waiting, unlocks, order) do
    {waiting, freed} =
      Enum.reduce(Map.fetch!(unlocks, letter), {waiting, []}, fn following, {waiting, freed} ->
        left = Map.fetch!(waiting, following) - 1
        waiting = Map.put(waiting, following, left)
        if left == 0, do: {waiting, [following | freed]}, else: {waiting, freed}
      end)

    take(rest ++ freed, waiting, unlocks, [letter | order])
  end
end
