store = Enum.reduce(["bad", "dad", "mad"], Solution.new(), &Solution.add_word(&2, &1))

[
  {~S{search("pad")}, inspect(false), inspect(Solution.search(store, "pad"))},
  {~S{search("bad")}, inspect(true), inspect(Solution.search(store, "bad"))},
  {~S{search(".ad")}, inspect(true), inspect(Solution.search(store, ".ad"))},
  {~S{search("b..")}, inspect(true), inspect(Solution.search(store, "b.."))},
  {~S{search("...")}, inspect(true), inspect(Solution.search(store, "..."))},
  {~S{search("b") -- too short}, inspect(false), inspect(Solution.search(store, "b"))},
  {~S{search("....") -- too long}, inspect(false), inspect(Solution.search(store, "...."))}
]
