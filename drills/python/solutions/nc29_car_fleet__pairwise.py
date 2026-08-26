def carFleet(target, position, speed):
    cars = list(zip(position, speed))
    return sum(1 for car in cars if leads(car, cars, target))


# A car leads a fleet exactly when it arrives strictly later than every car
# ahead of it; anything else means it catches one of them and merges. No
# sorting, no running state -- O(n^2), and the definition rather than a
# consequence of it.
def leads(car, cars, target):
    pos, spd = car
    return all(
        (target - pos) * other_speed > (target - other_pos) * spd
        for other_pos, other_speed in cars
        if other_pos > pos
    )
