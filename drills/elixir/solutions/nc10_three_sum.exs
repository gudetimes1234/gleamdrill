defmodule Solution do
  def three_sum(nums) do
    sorted = Enum.sort(nums)

    sorted
    |> Enum.with_index()
    |> Enum.flat_map(fn {a, i} ->
      rest = Enum.drop(sorted, i + 1)
      Enum.map(pairs_summing_to(rest, Enum.reverse(rest), length(rest), -a), fn {b, c} ->
        {a, b, c}
      end)
    end)
    |> Enum.uniq()
  end

  defp pairs_summing_to(_left, _right, remaining, _target) when remaining < 2, do: []

  defp pairs_summing_to([a | left], [b | right], remaining, target) do
    case a + b do
      ^target ->
        [{a, b} | pairs_summing_to(left, [b | right], remaining - 1, target)]

      sum when sum < target ->
        pairs_summing_to(left, [b | right], remaining - 1, target)

      _ ->
        pairs_summing_to([a | left], right, remaining - 1, target)
    end
  end
end
