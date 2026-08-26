def carFleet(target, position, speed):
    cars = sorted(zip(position, speed), reverse=True)

    fleets = 0
    lead_distance, lead_speed = 0, 1

    for pos, spd in cars:
        distance = target - pos
        # distance/spd > lead_distance/lead_speed, cross-multiplied so the
        # arrival times never have to become fractions.
        if distance * lead_speed > lead_distance * spd:
            fleets += 1
            lead_distance, lead_speed = distance, spd

    return fleets
