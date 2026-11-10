def parse_version(text):
    major, minor, patch = text.split(".")
    return (int(major), int(minor), int(patch))


def is_breaking(old, new):
    return parse_version(new)[0] > parse_version(old)[0]
