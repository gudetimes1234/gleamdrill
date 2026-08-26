def reversedString(s):
    out = ""
    for char in s:
        out = char + out
    return out

def everySecond(s):
    out = ""
    for i in range(0, len(s), 2):
        out += s[i]
    return out

def lastN(s, n):
    if n <= 0:
        return ""
    return "".join(s[i] for i in range(max(len(s) - n, 0), len(s)))

def trimEnds(s):
    return "".join(s[i] for i in range(1, len(s) - 1))
