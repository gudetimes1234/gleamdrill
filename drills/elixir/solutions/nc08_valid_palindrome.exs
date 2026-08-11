defmodule Solution do
  def palindrome?(s) do
    cleaned = clean(s)
    cleaned == Enum.reverse(cleaned)
  end

  defp clean(s) do
    s
    |> String.downcase()
    |> String.graphemes()
    |> Enum.filter(&(&1 =~ ~r/^[a-z0-9]$/))
  end
end
