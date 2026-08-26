defmodule Solution do
  def num_decodings(""), do: 0

  def num_decodings(s) do
    chars = s |> String.graphemes() |> List.to_tuple()
    {ways, _memo} = from(0, tuple_size(chars), chars, %{})
    ways
  end

  # The same two choices as a recursion from the front: take one character, or
  # take two if they read as 10 to 26. Reaching the end is one complete
  # decoding, which is why the base case returns 1 rather than 0.
  defp from(index, n, _chars, memo) when index >= n, do: {1, memo}

  defp from(index, n, chars, memo) do
    case Map.fetch(memo, index) do
      {:ok, cached} ->
        {cached, memo}

      :error ->
        here = elem(chars, index)

        if here == "0" do
          {0, Map.put(memo, index, 0)}
        else
          {alone, memo} = from(index + 1, n, chars, memo)

          {paired, memo} =
            if index + 1 < n and legal_pair?(here, elem(chars, index + 1)),
              do: from(index + 2, n, chars, memo),
              else: {0, memo}

          {alone + paired, Map.put(memo, index, alone + paired)}
        end
    end
  end

  defp legal_pair?(first, second) do
    value = String.to_integer(first <> second)
    value >= 10 and value <= 26
  end
end
