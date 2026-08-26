def minEatingSpeed(piles, h):
    # The search space is the answer, not the input. Feasibility is monotone --
    # if a speed finishes in time then so does every faster one -- which is
    # exactly the property halving needs.
    low, high = 1, max(piles)
    while low < high:
        mid = (low + high) // 2
        if hours(piles, mid) <= h:
            high = mid
        else:
            low = mid + 1
    return low


# A pile never shares an hour with another, so each costs ceil(pile / speed).
def hours(piles, speed):
    return sum((pile + speed - 1) // speed for pile in piles)
