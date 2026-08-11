defmodule Solution do
  @alphabet String.graphemes("ABCDEFGHIJKLMNOPQRSTUVWXYZ")

  def character_replacement(s, k) do
    # One sweep per letter, asking a much simpler question each time: how long
    # a window can I hold if *this* is the letter I keep?
    graphemes = String.graphemes(s)
    Enum.reduce(@alphabet, 0, fn target, best -> max(best, sweep(graphemes, graphemes, 0, 0, 0, target, k)) end)
  end

  defp sweep(_left, [], _size, _others, best, _target, _k), do: best

  defp sweep(left, [g | rest], size, others, best, target, k) do
    others = if g == target, do: others, else: others + 1
    {left, size, others} = shrink(left, size + 1, others, target, k)
    sweep(left, rest, size, others, max(best, size), target, k)
  end

  defp shrink([oldest | rest], size, others, target, k) when others > k do
    others = if oldest == target, do: others, else: others - 1
    shrink(rest, size - 1, others, target, k)
  end

  defp shrink(left, size, others, _target, _k), do: {left, size, others}
end
