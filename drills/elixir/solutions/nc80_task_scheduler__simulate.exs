defmodule Solution do
  # Run the schedule instead of computing it. Each round runs the n + 1 most
  # frequent tasks still outstanding -- the greedy choice, and it needs the
  # collection to hand back its largest values over and over, exactly the heap's
  # job. Note the zeros are dropped before each round: a finished task is not an
  # idle slot, and counting it as one is the easy mistake here.
  def least_interval(tasks, n) do
    tasks |> Enum.frequencies() |> Map.values() |> run_rounds(n, 0)
  end

  defp run_rounds(remaining, n, elapsed) do
    case remaining |> Enum.filter(&(&1 > 0)) |> Enum.sort(:desc) do
      [] ->
        elapsed

      outstanding ->
        running = Enum.take(outstanding, n + 1)
        remaining = Enum.map(running, &(&1 - 1)) ++ Enum.drop(outstanding, n + 1)

        # The last round costs only as many ticks as it actually uses.
        if Enum.any?(remaining, &(&1 > 0)),
          do: run_rounds(remaining, n, elapsed + n + 1),
          else: elapsed + length(running)
    end
  end
end
