from contextlib import contextmanager


@contextmanager
def override(settings, key, value):
    old = settings[key]
    settings[key] = value
    try:
        yield settings
    finally:
        settings[key] = old
