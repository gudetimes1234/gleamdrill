defmodule Solution do
  def word_break(s, word_dict) do
    {answer, _memo} = from(0, String.length(s), s, MapSet.new(word_dict), %{})
    answer
  end

  # Top-down: from this position, does any dictionary word start here and leave
  # a suffix that also breaks? Without the cache the same suffix is asked about
  # once per way of reaching it, which is where the exponential blow-up on
  # inputs like "aaaa...b" comes from.
  defp from(start, n, _s, _words, memo) when start >= n, do: {true, memo}

  defp from(start, n, s, words, memo) do
    case Map.fetch(memo, start) do
      {:ok, cached} ->
        {cached, memo}

      :error ->
        {found, memo} =
          Enum.reduce_while((start + 1)..n//1, {false, memo}, fn finish, {_found, memo} ->
            if MapSet.member?(words, String.slice(s, start, finish - start)) do
              case from(finish, n, s, words, memo) do
                {true, memo} -> {:halt, {true, memo}}
                {false, memo} -> {:cont, {false, memo}}
              end
            else
              {:cont, {false, memo}}
            end
          end)

        {found, Map.put(memo, start, found)}
    end
  end
end
