def is_comment(line):
    return line.startswith("#") or line.startswith(";") or line.startswith("//")
