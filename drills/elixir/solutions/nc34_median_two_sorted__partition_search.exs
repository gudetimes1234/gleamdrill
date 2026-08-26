defmodule Solution do
  def find_median_sorted_arrays([], []), do: 0.0

  def find_median_sorted_arrays(nums1, nums2) do
    # Always halve the shorter side, so the search is O(log min(m, n)).
    {a, b} =
      if length(nums1) > length(nums2), do: {nums2, nums1}, else: {nums1, nums2}

    m = length(a)
    total = m + length(b)
    search(List.to_tuple(a), List.to_tuple(b), m, length(b), total, div(total + 1, 2), 0, m)
  end

  defp search(a, b, m, n, total, half, low, high) do
    cut1 = div(low + high, 2)
    cut2 = half - cut1

    left1 = if cut1 > 0, do: elem(a, cut1 - 1), else: :negative
    right1 = if cut1 < m, do: elem(a, cut1), else: :positive
    left2 = if cut2 > 0, do: elem(b, cut2 - 1), else: :negative
    right2 = if cut2 < n, do: elem(b, cut2), else: :positive

    # A correct cut is one where everything left of it is <= everything right of
    # it, across both arrays.
    cond do
      le(left1, right2) and le(left2, right1) ->
        if rem(total, 2) == 1 do
          bigger(left1, left2) / 1
        else
          (bigger(left1, left2) + smaller(right1, right2)) / 2
        end

      not le(left1, right2) ->
        search(a, b, m, n, total, half, low, cut1 - 1)

      true ->
        search(a, b, m, n, total, half, cut1 + 1, high)
    end
  end

  # :negative and :positive stand in for the infinities at the array edges.
  defp le(:negative, _), do: true
  defp le(_, :positive), do: true
  defp le(:positive, _), do: false
  defp le(_, :negative), do: false
  defp le(x, y), do: x <= y

  defp bigger(:negative, y), do: y
  defp bigger(x, :negative), do: x
  defp bigger(x, y), do: max(x, y)

  defp smaller(:positive, y), do: y
  defp smaller(x, :positive), do: x
  defp smaller(x, y), do: min(x, y)
end
