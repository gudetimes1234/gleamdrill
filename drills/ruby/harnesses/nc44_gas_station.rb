need :can_complete_circuit

tc "can_complete_circuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])", 3, can_complete_circuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])
tc "can_complete_circuit([2, 3, 4], [3, 4, 3])", -1, can_complete_circuit([2, 3, 4], [3, 4, 3])
tc "can_complete_circuit([5], [4])", 0, can_complete_circuit([5], [4])
tc "can_complete_circuit([1, 2], [2, 1])", 1, can_complete_circuit([1, 2], [2, 1])
tc "can_complete_circuit([], [])", -1, can_complete_circuit([], [])
tc "can_complete_circuit([3, 1, 1], [1, 2, 2])", 0, can_complete_circuit([3, 1, 1], [1, 2, 2])
