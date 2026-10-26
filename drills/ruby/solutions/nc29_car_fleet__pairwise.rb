def car_fleet(target, position, speed)
  cars = position.zip(speed)
  cars.count { |car| leads(car, cars, target) }
end

# A car leads a fleet exactly when it arrives strictly later than every car
# ahead of it; anything else means it catches one of them and merges. No
# sorting, no running state -- O(n^2), and the definition rather than a
# consequence of it.
def leads(car, cars, target)
  pos, spd = car
  cars.all? do |other_pos, other_speed|
    other_pos <= pos || (target - pos) * other_speed > (target - other_pos) * spd
  end
end
