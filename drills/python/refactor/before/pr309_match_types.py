def describe(value):
    if isinstance(value, bool):
        return "flag"
    elif isinstance(value, int):
        return f"number {value}"
    elif isinstance(value, str):
        return f"text of {len(value)}"
    elif isinstance(value, list):
        return f"list of {len(value)}"
    else:
        return "unknown"
