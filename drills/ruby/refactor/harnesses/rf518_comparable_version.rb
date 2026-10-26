need :Version

v1_2 = Version.new(1, 2)
v1_10 = Version.new(1, 10)
v2_0 = Version.new(2, 0)
tc "Version 1.2 < 1.10 -- numbers, not strings", true, v1_2 < v1_10
tc "Version 2.0 > 1.10", true, v2_0 > v1_10
tc "Version 1.2 == 1.2", true, v1_2 == Version.new(1, 2)
tc "Version 1.10 < 1.2", false, v1_10 < v1_2
tc "style: [2.0, 1.2, 1.10].max -- sort and max come free", [2, 0], ([v2_0, v1_2, v1_10].max.then { |v| [v.major, v.minor] } rescue :no_spaceship)
uses(/include\s+Comparable/, "include Comparable")
avoids(/def\s+(<|>|==|<=|>=)\s*\(/, "hand-written comparison operators")
