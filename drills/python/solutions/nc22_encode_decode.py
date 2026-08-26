
def encode(strs):
    return "".join("%d#%s" % (len(s), s) for s in strs)


def decode(s):
    out = []
    i = 0
    while i < len(s):
        hash_at = s.index("#", i)
        length = int(s[i:hash_at])
        start = hash_at + 1
        out.append(s[start:start + length])
        i = start + length
    return out
