# Prepended to every Python refactoring harness by `gleam run -m generate`
# (drills/python/refactor/prelude.py; edit this one). The runner puts the
# attempt's source in `__source__` (web worker, terminal app, verify_all.py).
#
#   need("name", ...)          the starter's names must still be defined
#   tc(label, expected, actual)   a behaviour case, compared by repr
#   uses(pattern, what)        style case: the code matches the regex
#   avoids(pattern, what)      style case: the code does not match it
#
# Patterns match the source with comments blanked out (strings kept).
import re as __re__

__results__ = []


def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])


def need(*names):
    for name in names:
        if name not in globals():
            raise Exception("__signature_mismatch__")


def __blank_comments__(source):
    out, i, n, quote = [], 0, len(source), None
    while i < n:
        c = source[i]
        if quote:
            if c == "\\":
                out.append(source[i:i + 2])
                i += 2
                continue
            if source.startswith(quote, i):
                out.append(quote)
                i += len(quote)
                quote = None
                continue
            out.append(c)
            i += 1
        elif c in "'\"":
            quote = source[i:i + 3] if source.startswith(c * 3, i) else c
            out.append(quote)
            i += len(quote)
        elif c == "#":
            while i < n and source[i] != "\n":
                out.append(" ")
                i += 1
        else:
            out.append(c)
            i += 1
    return "".join(out)


def __solution_code__():
    return __blank_comments__(globals().get("__source__", ""))


def uses(pattern, what):
    found = __re__.search(pattern, __solution_code__(), __re__.M) is not None
    __case__("style: uses " + what, "yes", "yes" if found else "no")


def avoids(pattern, what):
    found = __re__.search(pattern, __solution_code__(), __re__.M) is not None
    __case__("style: no " + what, "yes", "no" if found else "yes")


tc = __case__
