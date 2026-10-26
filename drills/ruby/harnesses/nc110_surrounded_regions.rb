need :solve

def shown(rows) = solve(rows.map(&:chars)).map(&:join)

tc "solve(the classic 4x4)", ["XXXX", "XXXX", "XXXX", "XOXX"], shown(["XXXX", "XOOX", "XXOX", "XOXX"])
tc 'solve([["X"]])', ["X"], shown(["X"])
tc 'solve([["O"]]) -- on the border, so it survives', ["O"], shown(["O"])
tc "solve([])", [], shown([])
tc "solve(a region reaching the border)", ["XOX", "XOX", "XXX"], shown(["XOX", "XOX", "XXX"])
