import math

STANDARD_GRAVITY = 9.81


def potential_energy(mass, height):
    return mass * STANDARD_GRAVITY * height


def fall_speed(height):
    return math.sqrt(2 * STANDARD_GRAVITY * height)
