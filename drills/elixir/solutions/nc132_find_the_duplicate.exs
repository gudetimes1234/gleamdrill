defmodule Solution do
  # Read the list as a linked list: position i points at position nums[i].
  # Because every value is a valid position and one value repeats, two positions
  # point at the same place -- so the list has a cycle, and the duplicate is its
  # entrance. Then it is Floyd's, twice: once to meet inside the loop, once to
  # walk from the start and the meeting point together until they agree on where
  # it begins.
  def find_duplicate(nums) do
    values = List.to_tuple(nums)
    first = elem(values, 0)
    meeting = meet(values, first, elem(values, first))
    entrance(values, 0, meeting)
  end

  defp meet(_values, same, same), do: same

  defp meet(values, slow, fast) do
    meet(values, elem(values, slow), elem(values, elem(values, fast)))
  end

  defp entrance(_values, same, same), do: same

  defp entrance(values, from_start, from_meeting) do
    entrance(values, elem(values, from_start), elem(values, from_meeting))
  end
end
