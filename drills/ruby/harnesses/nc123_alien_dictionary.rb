need :alien_order

tc 'alien_order(["wrt", "wrf", "er", "ett", "rftt"])', "wertf", alien_order(["wrt", "wrf", "er", "ett", "rftt"])
tc 'alien_order(["z", "x"])', "zx", alien_order(["z", "x"])
tc 'alien_order(["z", "x", "z"]) -- contradictory', "", alien_order(["z", "x", "z"])
tc 'alien_order(["abc", "ab"]) -- a word before its own prefix', "", alien_order(["abc", "ab"])
tc 'alien_order(["z", "z"])', "z", alien_order(["z", "z"])
tc 'alien_order(["x", "y", "z"])', "xyz", alien_order(["x", "y", "z"])
