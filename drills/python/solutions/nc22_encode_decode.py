
def encode(strs):
    return "".join("%d#%s" % (len(s), s) for s in strs)  # @1


def decode(s):
    out = []  # @2
    i = 0  # @2
    while i < len(s):  # @3
        hash_at = s.index("#", i)  # @4
        length = int(s[i:hash_at])  # @5
        start = hash_at + 1  # @6
        out.append(s[start:start + length])  # @6
        i = start + length  # @7
    return out  # @8
