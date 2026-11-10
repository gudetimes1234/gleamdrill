need("calculate")


def raised_message(op, a, b):
    try:
        calculate(op, a, b)
    except ValueError as error:
        return str(error)
    return "no error"


tc("calculate('add', 2, 3)", 5, calculate("add", 2, 3))
tc("calculate('sub', 2, 3)", -1, calculate("sub", 2, 3))
tc("calculate('mul', 4, 2.5)", 10.0, calculate("mul", 4, 2.5))
tc("calculate('div', 7, 2)", 3.5, calculate("div", 7, 2))
tc("calculate('pow', 2, 3) -- unknown op raises", "unknown op: pow", raised_message("pow", 2, 3))
uses(r"\{\s*[\'\"]\w+[\'\"]\s*:", "a dict of operations")
avoids(r"\belif\b", "an elif chain")
