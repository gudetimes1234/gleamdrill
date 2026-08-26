round_trip = fn strs -> Solution.decode(Solution.encode(strs)) end

# ~S{} rather than a quoted string: the labels carry backslashes and pipes, and
# this sigil takes both literally.
[
  {~S{decode(encode(["neet", "code", "love", "you"]))},
   inspect(["neet", "code", "love", "you"]),
   inspect(round_trip.(["neet", "code", "love", "you"]))},
  {~S{decode(encode([]))}, inspect([]), inspect(round_trip.([]))},
  {~S{decode(encode(["", ""]))}, inspect(["", ""]), inspect(round_trip.(["", ""]))},
  {~S{decode(encode(["3#x", "a|b"]))}, inspect(["3#x", "a|b"]),
   inspect(round_trip.(["3#x", "a|b"]))},
  {~S{decode(encode(["\\", "|", "#"]))}, inspect(["\\", "|", "#"]),
   inspect(round_trip.(["\\", "|", "#"]))}
]
