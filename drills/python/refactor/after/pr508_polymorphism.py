class Bird:
    def __init__(self, coconuts):
        self.coconuts = coconuts

    def speed(self):
        return 0


class European(Bird):
    def speed(self):
        return 35


class African(Bird):
    def speed(self):
        return 40 - 2 * self.coconuts


def make_bird(kind, coconuts=0):
    classes = {"european": European, "african": African}
    return classes.get(kind, Bird)(coconuts)
