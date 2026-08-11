defmodule Solution do
  def palindrome?(s) do
    # Compare inwards from both ends instead of building a reversed copy.
    cleaned =
      s
      |> String.downcase()
      |> String.replace(~r/[^a-z0-9]/, "")
      |> String.graphemes()

    converge(cleaned, Enum.reverse(cleaned), div(length(cleaned), 2))
  end

  defp converge(_forward, _backward, 0), do: true

  defp converge([a | forward], [b | backward], remaining) do
    a == b and converge(forward, backward, remaining - 1)
  end
end
