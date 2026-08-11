defmodule Solution do
  def group_anagrams(strs) do
    strs
    |> Enum.group_by(fn s -> s |> String.graphemes() |> Enum.sort() end)
    |> Map.values()
  end
end
