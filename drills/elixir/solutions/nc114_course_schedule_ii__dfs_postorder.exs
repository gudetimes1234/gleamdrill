defmodule Solution do
  def find_order(num_courses, prerequisites) do
    needs =
      Enum.reduce(prerequisites, %{}, fn [course, prereq], acc ->
        Map.update(acc, course, [prereq], &[prereq | &1])
      end)

    0..(num_courses - 1)//1
    |> Enum.reduce_while({MapSet.new(), []}, fn course, {done, order} ->
      case visit(course, needs, MapSet.new(), done, order) do
        {:ok, done, order} -> {:cont, {done, order}}
        :cycle -> {:halt, :cycle}
      end
    end)
    |> case do
      :cycle -> []
      {_done, order} -> Enum.reverse(order)
    end
  end

  # Depth-first, recording a course only *after* everything it depends on has
  # been recorded. That post-order is a valid schedule by construction -- no
  # indegrees to maintain -- and the in-progress set doubles as the cycle check,
  # which is what makes the impossible case fall out of the same walk.
  defp visit(course, needs, on_path, done, order) do
    cond do
      MapSet.member?(on_path, course) ->
        :cycle

      MapSet.member?(done, course) ->
        {:ok, done, order}

      true ->
        on_path = MapSet.put(on_path, course)

        Map.get(needs, course, [])
        |> Enum.reduce_while({:ok, done, order}, fn prereq, {:ok, done, order} ->
          case visit(prereq, needs, on_path, done, order) do
            {:ok, done, order} -> {:cont, {:ok, done, order}}
            :cycle -> {:halt, :cycle}
          end
        end)
        |> case do
          :cycle -> :cycle
          {:ok, done, order} -> {:ok, MapSet.put(done, course), [course | order]}
        end
    end
  end
end
