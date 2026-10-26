need :top_scorers

players = [{ name: "a", score: 3 }, { name: "b", score: 0 }, { name: "c", score: 9 }, { name: "d", score: 5 }]
tc "top_scorers(players, 2)", %w[c d], top_scorers(players, 2)
tc "top_scorers(players, 10) -- fewer than asked", %w[c d a], top_scorers(players, 10)
tc "top_scorers([], 3)", [], top_scorers([], 3)
uses(/\.sort_by\b/, "sort_by")
uses(/\.(first|take)\(/, "first(n)")
avoids(/\.each\b|\bwhile\b|\bfor\b/, "hand-written loop")
