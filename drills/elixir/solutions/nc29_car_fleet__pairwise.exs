defmodule Solution do
  def car_fleet(target, position, speed) do
    cars = Enum.zip(position, speed)
    Enum.count(cars, &leads?(&1, cars, target))
  end

  # A car leads a fleet exactly when it arrives strictly later than every car
  # ahead of it; anything else means it catches one of them and merges. No
  # sorting, no running state -- O(n^2), and the definition rather than a
  # consequence of it.
  defp leads?({pos, spd}, cars, target) do
    cars
    |> Enum.filter(fn {other_pos, _} -> other_pos > pos end)
    |> Enum.all?(fn {other_pos, other_speed} ->
      (target - pos) * other_speed > (target - other_pos) * spd
    end)
  end
end
