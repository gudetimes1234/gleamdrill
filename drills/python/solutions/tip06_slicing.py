def reversedString(s):
    return s[::-1]

def everySecond(s):
    return s[::2]

def lastN(s, n):
    return s[-n:] if n > 0 else ""

def trimEnds(s):
    return s[1:-1]
