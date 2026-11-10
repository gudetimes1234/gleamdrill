from collections import namedtuple

Version = namedtuple("Version", ["major", "minor", "patch"])


def parse_version(text):
    major, minor, patch = text.split(".")
    return Version(int(major), int(minor), int(patch))


def is_breaking(old, new):
    return parse_version(new).major > parse_version(old).major
