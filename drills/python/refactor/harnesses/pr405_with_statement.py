need("Lock", "apply_all")


def logged(changes):
    lock = Lock()
    try:
        apply_all(lock, changes)
    except ValueError:
        pass
    return lock.log


tc("apply_all(Lock(), [1, 2])", ["acquire", 1, 2, "release"], logged([1, 2]))
tc("apply_all(Lock(), []) -- empty", ["acquire", "release"], logged([]))
tc("apply_all(Lock(), [1, -1, 2]) -- released on error", ["acquire", 1, "release"], logged([1, -1, 2]))
uses(r"^\s*with\s+\w+", "a with block")
avoids(r"\bfinally\b", "try/finally")
