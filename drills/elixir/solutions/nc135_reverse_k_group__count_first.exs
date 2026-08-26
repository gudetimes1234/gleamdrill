defmodule Solution do
  def reverse_k_group(values, k) when k <= 1, do: values

  def reverse_k_group(values, k) do
    # Count once, then reverse the first (length / k) * k values and leave the
    # rest. One length calculation instead of a look-ahead per group -- and it
    # makes the boundary explicit: everything past the last whole group is
    # untouched, however long it is.
    whole = div(length(values), k) * k
    {full, tail} = Enum.split(values, whole)
    reverse_runs(full, k) ++ tail
  end

  defp reverse_runs([], _k), do: []

  defp reverse_runs(values, k) do
    {group, rest} = Enum.split(values, k)
    Enum.reverse(group) ++ reverse_runs(rest, k)
  end
end
