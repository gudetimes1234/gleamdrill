def with_overrides(defaults, overrides):
    merged = {}
    for key in defaults:
        merged[key] = defaults[key]
    for key in overrides:
        merged[key] = overrides[key]
    return merged
