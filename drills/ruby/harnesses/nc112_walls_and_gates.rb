need :walls_and_gates

inf = 2_147_483_647

tc "walls_and_gates(the classic 4x4)", [[3, -1, 0, 1], [2, 2, 1, -1], [1, -1, 2, -1], [0, -1, 3, 4]],
   walls_and_gates([[inf, -1, 0, inf], [inf, inf, inf, -1], [inf, -1, inf, -1], [0, -1, inf, inf]])
tc "walls_and_gates([[0]])", [[0]], walls_and_gates([[0]])
tc "walls_and_gates([[-1]])", [[-1]], walls_and_gates([[-1]])
tc "walls_and_gates([])", [], walls_and_gates([])
tc "walls_and_gates(no gate at all)", [[inf, inf]], walls_and_gates([[inf, inf]])
