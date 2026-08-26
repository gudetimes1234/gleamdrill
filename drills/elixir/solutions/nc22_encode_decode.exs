
defmodule Solution do
  def encode(strs) do
    Enum.map_join(strs, fn s -> "#{String.length(s)}##{s}" end)
  end

  def decode(s), do: read(s, [])

  defp read("", acc), do: Enum.reverse(acc)

  defp read(rest, acc) do
    [digits, tail] = String.split(rest, "#", parts: 2)
    length = String.to_integer(digits)
    read(String.slice(tail, length..-1//1), [String.slice(tail, 0, length) | acc])
  end
end
