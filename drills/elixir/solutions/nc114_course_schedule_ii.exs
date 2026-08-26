defmodule Solution do
  # The same Kahn's algorithm as deciding whether it is possible -- except the
  # order courses come off the ready list *is* the answer. Detecting the cycle
  # and producing the schedule are the same computation.
  def find_order(num_courses, prerequisites) do
    waiting =
      Enum.reduce(prerequisites, %{}, fn [course, _prereq], acc ->
        Map.update(acc, course, 1, &(&1 + 1))
      end)

    unlocks =
      Enum.reduce(prerequisites, %{}, fn [course, prereq], acc ->
        Map.update(acc, prereq, [course], &[course | &1])
      end)

    ready = for c <- 0..(num_courses - 1)//1, Map.get(waiting, c, 0) == 0, do: c
    order = take(ready, waiting, unlocks, [])

    # Stalled with courses left, so no order exists at all.
    if length(order) == num_courses, do: order, else: []
  end

  defp take([], _waiting, _unlocks, order), do: Enum.reverse(order)

  defp take([course | rest], waiting, unlocks, order) do
    {waiting, freed} =
      Enum.reduce(Map.get(unlocks, course, []), {waiting, []}, fn following, {waiting, freed} ->
        left = Map.get(waiting, following, 0) - 1
        waiting = Map.put(waiting, following, left)
        if left == 0, do: {waiting, [following | freed]}, else: {waiting, freed}
      end)

    take(rest ++ freed, waiting, unlocks, [course | order])
  end
end
