class Bird:
    def __init__(self, kind, coconuts):
        self.kind = kind
        self.coconuts = coconuts

    def speed(self):
        if self.kind == "european":
            return 35
        if self.kind == "african":
            return 40 - 2 * self.coconuts
        return 0


def make_bird(kind, coconuts=0):
    return Bird(kind, coconuts)
