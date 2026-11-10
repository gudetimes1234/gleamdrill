import math


def potential_energy(mass, height):
    return mass * 9.81 * height


def fall_speed(height):
    return math.sqrt(2 * 9.81 * height)
