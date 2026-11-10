def clamp_volume(level):
    if level < 0:
        return 0
    if level > 100:
        return 100
    return level
