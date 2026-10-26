def car_fleet(target, position, speed)
  cars = position.zip(speed).sort.reverse

  fleets = 0
  lead_distance = 0
  lead_speed = 1

  cars.each do |pos, spd|
    distance = target - pos
    # distance/spd > lead_distance/lead_speed, cross-multiplied so the
    # arrival times never have to become fractions.
    if distance * lead_speed > lead_distance * spd
      fleets += 1
      lead_distance = distance
      lead_speed = spd
    end
  end
  fleets
end
