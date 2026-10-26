need :encode, :decode

def round_trip(strs) = decode(encode(strs))

tc 'decode(encode(["neet", "code", "love", "you"]))', ["neet", "code", "love", "you"], round_trip(["neet", "code", "love", "you"])
tc "decode(encode([]))", [], round_trip([])
tc 'decode(encode(["", ""]))', ["", ""], round_trip(["", ""])
tc 'decode(encode(["3#x", "a|b"]))', ["3#x", "a|b"], round_trip(["3#x", "a|b"])
tc 'decode(encode(["\\\\", "|", "#"]))', ["\\", "|", "#"], round_trip(["\\", "|", "#"])
