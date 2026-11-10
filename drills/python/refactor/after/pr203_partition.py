def split_header(line):
    name, _, value = line.partition(":")
    return name, value.strip()
