def carFleet(target, position, speed):
    cars = sorted(zip(position, speed), reverse=True)  # @1

    fleets = 0  # @2
    lead_distance, lead_speed = 0, 1  # @3

    for pos, spd in cars:  # @4
        distance = target - pos  # @5
        # distance/spd > lead_distance/lead_speed, cross-multiplied so the
        # arrival times never have to become fractions.
        if distance * lead_speed > lead_distance * spd:  # @6
            fleets += 1  # @7
            lead_distance, lead_speed = distance, spd  # @8

    return fleets  # @9
