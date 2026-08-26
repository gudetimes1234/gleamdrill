defmodule Solution do
  def can_finish(num_courses, prerequisites) do
    needs =
      Enum.reduce(prerequisites, %{}, fn [course, prereq], acc ->
        Map.update(acc, course, [prereq], &[prereq | &1])
      end)

    0..(num_courses - 1)//1
    |> Enum.reduce_while(MapSet.new(), fn course, done ->
      case visit(course, needs, MapSet.new(), done) do
        {:ok, done} -> {:cont, done}
        :cycle -> {:halt, :cycle}
      end
    end)
    |> Kernel.!=(:cycle)
  end

  # Depth-first with three states rather than two. "Seen" is not enough: a node
  # reached twice down *different* branches is fine, while a node reached again
  # while still on the current path is a cycle. The in-progress set is what
  # tells those apart.
  defp visit(course, needs, on_path, done) do
    cond do
      MapSet.member?(on_path, course) ->
        :cycle

      MapSet.member?(done, course) ->
        {:ok, done}

      true ->
        on_path = MapSet.put(on_path, course)

        Map.get(needs, course, [])
        |> Enum.reduce_while({:ok, done}, fn prereq, {:ok, done} ->
          case visit(prereq, needs, on_path, done) do
            {:ok, done} -> {:cont, {:ok, done}}
            :cycle -> {:halt, :cycle}
          end
        end)
        |> case do
          :cycle -> :cycle
          {:ok, done} -> {:ok, MapSet.put(done, course)}
        end
    end
  end
end
