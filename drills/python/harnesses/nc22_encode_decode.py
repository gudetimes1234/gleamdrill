
try:
    (encode, decode)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

def __round_trip__(strs):
    return decode(encode(strs))

__case__("decode(encode(['neet', 'code', 'love', 'you']))", ["neet", "code", "love", "you"], __round_trip__(["neet", "code", "love", "you"]))
__case__("decode(encode([]))", [], __round_trip__([]))
__case__("decode(encode(['', '']))", ["", ""], __round_trip__(["", ""]))
__case__("decode(encode(['3#x', 'a|b']))", ["3#x", "a|b"], __round_trip__(["3#x", "a|b"]))
__case__("decode(encode(['\\\\', '|', '#']))", ["\\", "|", "#"], __round_trip__(["\\", "|", "#"]))
