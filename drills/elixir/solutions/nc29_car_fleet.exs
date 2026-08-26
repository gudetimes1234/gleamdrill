defmodule Solution do
  def car_fleet(target, position, speed) do
    {fleets, _lead_distance, _lead_speed} =
      position
      |> Enum.zip(speed)
      |> Enum.sort_by(fn {pos, _spd} -> pos end, :desc)
      |> Enum.reduce({0, 0, 1}, fn {pos, spd}, {fleets, lead_distance, lead_speed} ->
        distance = target - pos

        # distance/spd > lead_distance/lead_speed, cross-multiplied so the
        # arrival times never have to become fractions.
        if distance * lead_speed > lead_distance * spd do
          {fleets + 1, distance, spd}
        else
          {fleets, lead_distance, lead_speed}
        end
      end)

    fleets
  end
end
