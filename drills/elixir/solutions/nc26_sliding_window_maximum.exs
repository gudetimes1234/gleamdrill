defmodule Solution do
  def max_sliding_window(_nums, k) when k <= 0, do: []

  def max_sliding_window(nums, k) do
    blocks = Enum.chunk_every(nums, k)
    left = Enum.flat_map(blocks, &running_max/1)

    right =
      Enum.flat_map(blocks, fn block ->
        block |> Enum.reverse() |> running_max() |> Enum.reverse()
      end)

    # Every window of width k straddles at most one block boundary, so it is
    # covered by a suffix of one block and a prefix of the next.
    [right, Enum.drop(left, k - 1)]
    |> Enum.zip_with(fn [r, l] -> max(r, l) end)
  end

  # Seeded with the first element rather than zero: the values can be negative.
  defp running_max([]), do: []
  defp running_max([first | rest]), do: [first | Enum.scan(rest, first, &max/2)]
end
