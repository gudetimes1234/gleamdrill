defmodule Solution do
  # Count first, then drop by position. Two passes rather than one, and it says
  # outright what the two-walker version encodes in a gap: nth from the end is
  # length minus n from the front. Where a list cannot be walked twice -- a
  # stream, say -- that is exactly the assumption that fails.
  def remove_nth_from_end(values, n) do
    index = length(values) - n

    if index < 0,
      do: values,
      else: List.delete_at(values, index)
  end
end
