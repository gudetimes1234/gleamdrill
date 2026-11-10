from enum import Enum


class Light(Enum):
    RED = 1
    YELLOW = 2
    GREEN = 3


def label(light):
    return light.name.title()


def next_light(light):
    if light == Light.GREEN:
        return Light.YELLOW
    if light == Light.YELLOW:
        return Light.RED
    return Light.GREEN
