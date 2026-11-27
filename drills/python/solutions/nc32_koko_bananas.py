def minEatingSpeed(piles, h):
    # The search space is the answer, not the input. Feasibility is monotone --
    # if a speed finishes in time then so does every faster one -- which is
    # exactly the property halving needs.
    low, high = 1, max(piles)  # @1
    while low < high:  # @2
        mid = (low + high) // 2  # @3
        if hours(piles, mid) <= h:  # @4
            high = mid  # @4
        else:  # @5
            low = mid + 1  # @5
    return low  # @6


# A pile never shares an hour with another, so each costs ceil(pile / speed).
def hours(piles, speed):
    return sum((pile + speed - 1) // speed for pile in piles)  # @7
