def minEatingSpeed(piles, h):
    highest = max(piles)
    speed = 1
    while speed < highest and hours(piles, speed) > h:
        speed += 1
    return speed


def hours(piles, speed):
    return sum((pile + speed - 1) // speed for pile in piles)
