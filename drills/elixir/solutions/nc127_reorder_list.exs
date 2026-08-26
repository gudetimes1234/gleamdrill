defmodule Solution do
  # Three separate steps, each of which is its own drill: find the middle,
  # reverse the back half, then interleave. That decomposition is the whole
  # trick -- none of the three needs to know about the others.
  def reorder_list(values) do
    half = div(length(values) + 1, 2)
    {front, back} = Enum.split(values, half)
    interleave(front, Enum.reverse(back))
  end

  defp interleave([], rest), do: rest
  defp interleave(rest, []), do: rest
  defp interleave([a | a_rest], [b | b_rest]), do: [a, b | interleave(a_rest, b_rest)]
end
