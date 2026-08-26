defmodule Solution do
  # Take the smallest head across all the lists, over and over. This is the heap
  # solution with the heap spelled out as a scan, since Elixir has no priority
  # queue: O(k) per element rather than O(log k), which is the entire difference
  # the heap makes. What it does not need is any pairing structure -- it works
  # just as well on lists arriving one at a time.
  def merge_k_lists(lists) do
    lists
    |> Enum.reject(&(&1 == []))
    |> take_smallest([])
    |> Enum.reverse()
  end

  defp take_smallest([], out), do: out

  defp take_smallest(lists, out) do
    {[taken | remainder], index} =
      lists
      |> Enum.with_index()
      |> Enum.min_by(fn {[head | _rest], _i} -> head end)

    rest = List.delete_at(lists, index)

    # The emptied list is dropped rather than kept: an empty list has no head to
    # compare, so leaving it in would break the very next round.
    case remainder do
      [] -> take_smallest(rest, [taken | out])
      _ -> take_smallest([remainder | rest], [taken | out])
    end
  end
end
