def parse_settings(lines):
    settings = {}
    for line in lines:
        path, value = line.split("=")
        section, key = path.split(".")
        settings.setdefault(section, {})[key] = value
    return settings
