defmodule Solution do
  # Padding with a 1 at each end removes the edge cases: every balloon then has
  # a neighbour on both sides whatever happens.
  def max_coins(nums) do
    balloons = List.to_tuple([1] ++ nums ++ [1])
    {best, _memo} = span(0, tuple_size(balloons) - 1, balloons, %{})
    best
  end

  # The trick is to ask which balloon is burst *last* in a span rather than
  # first. The last one still has both span boundaries as neighbours -- they are
  # untouched by definition -- so its value is known, and the two sides become
  # independent subproblems. Asking "first" leaves neighbours that depend on the
  # other side, and the recursion does not close.
  defp span(left, right, _balloons, memo) when right - left < 2, do: {0, memo}

  defp span(left, right, balloons, memo) do
    case Map.fetch(memo, {left, right}) do
      {:ok, cached} ->
        {cached, memo}

      :error ->
        {best, memo} =
          Enum.reduce((left + 1)..(right - 1)//1, {0, memo}, fn last, {best, memo} ->
            {before, memo} = span(left, last, balloons, memo)
            {rest, memo} = span(last, right, balloons, memo)
            value = elem(balloons, left) * elem(balloons, last) * elem(balloons, right)
            {max(best, value + before + rest), memo}
          end)

        {best, Map.put(memo, {left, right}, best)}
    end
  end
end
