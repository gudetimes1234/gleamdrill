need("override")


def during_and_after(settings, key, value):
    with override(settings, key, value) as live:
        seen = live[key]
    return seen, settings[key]


def after_error(settings, key, value):
    try:
        with override(settings, key, value):
            raise RuntimeError("boom")
    except RuntimeError:
        pass
    return settings[key]


def missing_key():
    try:
        with override({}, "x", 1):
            return "entered"
    except KeyError:
        return "KeyError"


tc("override({'debug': False}, 'debug', True) -- inside, then after", (True, False), during_and_after({"debug": False}, "debug", True))
tc("override({'level': 1}, 'level', 9) -- restored after an error", 1, after_error({"level": 1}, "level", 9))
tc("override({}, 'x', 1) -- missing key", "KeyError", missing_key())
uses(r"@(contextlib\.)?contextmanager\b", "@contextmanager")
avoids(r"def __(enter|exit)__", "__enter__ and __exit__")
