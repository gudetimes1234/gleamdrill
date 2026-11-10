class Light:
    RED = 1
    YELLOW = 2
    GREEN = 3


NAMES = {1: "RED", 2: "YELLOW", 3: "GREEN"}


def label(light):
    return NAMES[light].title()


def next_light(light):
    if light == Light.GREEN:
        return Light.YELLOW
    if light == Light.YELLOW:
        return Light.RED
    return Light.GREEN
