defmodule Solution do
  # Reverse each full run of k and leave a short tail alone. Checking that k
  # nodes are actually there *before* reversing is the whole difficulty -- the
  # imperative version has to walk ahead and come back, because once it starts
  # rewiring it cannot tell how far it got.
  def reverse_k_group(values, k) when k <= 1, do: values
  def reverse_k_group(values, k), do: in_groups(values, k)

  defp in_groups(values, k) do
    {group, rest} = Enum.split(values, k)

    if length(group) < k,
      do: values,
      else: Enum.reverse(group) ++ in_groups(rest, k)
  end
end
