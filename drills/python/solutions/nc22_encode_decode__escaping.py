
SEPARATOR = "|"
ESCAPE = "\\"


def encode(strs):
    return "".join(
        SEPARATOR + s.replace(ESCAPE, ESCAPE * 2).replace(SEPARATOR, ESCAPE + SEPARATOR)
        for s in strs
    )


def decode(s):
    # The leading separator is what tells [] and [""] apart: one encodes to the
    # empty string, the other to a lone separator.
    if not s:
        return []
    out = []
    current = []
    i = 1
    while i < len(s):
        if s[i] == ESCAPE:
            current.append(s[i + 1])
            i += 2
        elif s[i] == SEPARATOR:
            out.append("".join(current))
            current = []
            i += 1
        else:
            current.append(s[i])
            i += 1
    out.append("".join(current))
    return out
