def describe(value):
    match value:
        case bool():
            return "flag"
        case int():
            return f"number {value}"
        case str():
            return f"text of {len(value)}"
        case list():
            return f"list of {len(value)}"
        case _:
            return "unknown"
