defmodule Solution do
  def rob([]), do: 0
  def rob([only]), do: only

  # One pass carrying both stories at the same time: the run that is allowed to
  # take the first house, and the run that is not. Neither ever looks at the
  # other, so this is the two-pass version interleaved -- useful when the input
  # can only be walked once.
  def rob(nums) do
    last = length(nums) - 1

    {{with_first, _}, {without_first, _}} =
      nums
      |> Enum.with_index()
      |> Enum.reduce({{0, 0}, {0, 0}}, fn {value, i}, {with_first, without_first} ->
        {
          if(i == last, do: with_first, else: step(with_first, value)),
          if(i == 0, do: without_first, else: step(without_first, value))
        }
      end)

    max(with_first, without_first)
  end

  defp step({best, previous}, value), do: {max(best, previous + value), best}
end
