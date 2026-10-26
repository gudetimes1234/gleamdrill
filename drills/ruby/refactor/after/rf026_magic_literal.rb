STANDARD_GRAVITY = 9.81

def potential_energy(mass, height)
  (mass * STANDARD_GRAVITY * height).round(2)
end

def fall_speed(height)
  Math.sqrt(2 * STANDARD_GRAVITY * height).round(2)
end
