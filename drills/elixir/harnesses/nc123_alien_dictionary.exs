[
  {"alien_order([wrt, wrf, er, ett, rftt])", inspect("wertf"),
   inspect(Solution.alien_order(["wrt", "wrf", "er", "ett", "rftt"]))},
  {"alien_order([z, x])", inspect("zx"), inspect(Solution.alien_order(["z", "x"]))},
  {"alien_order([z, x, z]) -- contradictory", inspect(""),
   inspect(Solution.alien_order(["z", "x", "z"]))},
  {"alien_order([abc, ab]) -- a word before its own prefix", inspect(""),
   inspect(Solution.alien_order(["abc", "ab"]))},
  {"alien_order([z, z])", inspect("z"), inspect(Solution.alien_order(["z", "z"]))},
  {"alien_order([x, y, z])", inspect("xyz"), inspect(Solution.alien_order(["x", "y", "z"]))}
]
