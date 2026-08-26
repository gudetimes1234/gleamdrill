defmodule Solution do
  def valid?(s) do
    reduce(s) == ""
  end

  defp reduce(s) do
    smaller = s |> String.replace("()", "") |> String.replace("[]", "") |> String.replace("{}", "")
    if smaller == s, do: s, else: reduce(smaller)
  end
end
