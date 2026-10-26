def can_complete_circuit(gas, cost)
  # Drive the whole loop from each start and see whether the tank ever goes
  # negative. O(n^2): the definition, and what the single pass replaces.
  diffs = gas.zip(cost).map { |g, c| g - c }

  diffs.each_index do |start|
    tank = 0
    survives = diffs.rotate(start).all? { |diff| (tank += diff) >= 0 }
    return start if survives
  end

  -1
end
