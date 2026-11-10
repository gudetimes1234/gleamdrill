def parse_settings(lines):
    settings = {}
    for line in lines:
        path, value = line.split("=")
        section, key = path.split(".")
        if section not in settings:
            settings[section] = {}
        settings[section][key] = value
    return settings
