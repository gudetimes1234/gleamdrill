import operator

OPERATIONS = {
    "add": operator.add,
    "sub": operator.sub,
    "mul": operator.mul,
    "div": operator.truediv,
}


def calculate(op, a, b):
    if op not in OPERATIONS:
        raise ValueError(f"unknown op: {op}")
    return OPERATIONS[op](a, b)
