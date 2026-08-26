defmodule Solution do
  def new(k, nums), do: {k, nums}

  def add({k, seen}, value), do: {k, [value | seen]}

  # Keep the whole stream and sort on demand. Wrong for a real stream -- memory
  # grows without bound and every query costs a sort -- but it is the
  # definition, and it is what the bounded structure has to be checked against.
  def kth({k, seen}) when length(seen) < k, do: nil
  def kth({k, seen}), do: seen |> Enum.sort(:desc) |> Enum.at(k - 1)
end
