def breadcrumb(parts):
    if not parts:
        return ""
    trail = parts[0]
    for part in parts[1:]:
        trail = trail + " > " + part
    return trail
