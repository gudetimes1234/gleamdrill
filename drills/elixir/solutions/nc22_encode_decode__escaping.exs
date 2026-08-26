
defmodule Solution do
  @separator "|"
  @escape "\\"

  def encode(strs) do
    Enum.map_join(strs, fn s ->
      @separator <>
        (s
         |> String.replace(@escape, @escape <> @escape)
         |> String.replace(@separator, @escape <> @separator))
    end)
  end

  # The leading separator is what tells [] and [""] apart: one encodes to the
  # empty string, the other to a lone separator.
  def decode(""), do: []

  def decode(@separator <> rest), do: unescape(String.graphemes(rest), "", [])

  def decode(_), do: []

  defp unescape([], current, acc), do: Enum.reverse([current | acc])

  defp unescape([@escape, escaped | rest], current, acc),
    do: unescape(rest, current <> escaped, acc)

  defp unescape([@separator | rest], current, acc),
    do: unescape(rest, "", [current | acc])

  defp unescape([g | rest], current, acc), do: unescape(rest, current <> g, acc)
end
