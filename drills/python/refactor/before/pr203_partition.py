def split_header(line):
    colon = line.find(":")
    name = line[:colon]
    value = line[colon + 1:]
    return name, value.strip()
