defmodule Solution do
  # Kahn's algorithm. Courses with nothing outstanding can be taken now; taking
  # one releases whatever depended on it. If the process stalls with courses
  # left, those courses depend on each other in a circle -- a cycle is exactly
  # what "cannot be finished" means.
  def can_finish(num_courses, prerequisites) do
    waiting =
      Enum.reduce(prerequisites, %{}, fn [course, _prereq], acc ->
        Map.update(acc, course, 1, &(&1 + 1))
      end)

    unlocks =
      Enum.reduce(prerequisites, %{}, fn [course, prereq], acc ->
        Map.update(acc, prereq, [course], &[course | &1])
      end)

    ready = for c <- 0..(num_courses - 1)//1, Map.get(waiting, c, 0) == 0, do: c

    take(ready, waiting, unlocks, 0) == num_courses
  end

  defp take([], _waiting, _unlocks, taken), do: taken

  defp take([course | rest], waiting, unlocks, taken) do
    {waiting, freed} =
      Enum.reduce(Map.get(unlocks, course, []), {waiting, []}, fn following, {waiting, freed} ->
        left = Map.get(waiting, following, 0) - 1
        waiting = Map.put(waiting, following, left)
        if left == 0, do: {waiting, [following | freed]}, else: {waiting, freed}
      end)

    take(rest ++ freed, waiting, unlocks, taken + 1)
  end
end
