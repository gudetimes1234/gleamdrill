def potential_energy(mass, height)
  (mass * 9.81 * height).round(2)
end

def fall_speed(height)
  Math.sqrt(2 * 9.81 * height).round(2)
end
