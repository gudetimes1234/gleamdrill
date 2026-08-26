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
        after_map =
          Enum.reduce(pairs, Map.new(letters, &{&1, []}), fn {a, b}, acc ->
            Map.update!(acc, a, &[b | &1])
          end)

        # Depth-first, recording a letter only once everything that must follow
        # it has been recorded -- and recording it by prepending, which is what
        # puts it back in front of them. The in-progress set is the cycle check:
        # a letter met again on the current path contradicts itself.
        letters
        |> Enum.reduce_while({MapSet.new(), []}, fn letter, {done, order} ->
          case visit(after_map, letter, MapSet.new(), done, order) do
            :cycle -> {:halt, :cycle}
            {done, order} -> {:cont, {done, order}}
          end
        end)
        |> case do
          :cycle -> ""
          {_done, order} -> Enum.join(order)
        end
    end
  end

  defp visit(after_map, letter, on_path, done, order) do
    cond do
      MapSet.member?(on_path, letter) ->
        :cycle

      MapSet.member?(done, letter) ->
        {done, order}

      true ->
        on_path = MapSet.put(on_path, letter)

        after_map
        |> Map.fetch!(letter)
        |> Enum.reduce_while({done, order}, fn following, {done, order} ->
          case visit(after_map, following, on_path, done, order) do
            :cycle -> {:halt, :cycle}
            {done, order} -> {:cont, {done, order}}
          end
        end)
        |> case do
          :cycle -> :cycle
          {done, order} -> {MapSet.put(done, letter), [letter | order]}
        end
    end
  end

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
end
