need :solve_n_queens

def sorted_boards(n) = solve_n_queens(n).map { |board| board.join("|") }.sort

tc "solve_n_queens(4)", ["..Q.|Q...|...Q|.Q..", ".Q..|...Q|Q...|..Q."], sorted_boards(4)
tc "solve_n_queens(1)", ["Q"], sorted_boards(1)
tc "solve_n_queens(2)", [], sorted_boards(2)
tc "solve_n_queens(3)", [], sorted_boards(3)
tc "solve_n_queens(6) count", 4, solve_n_queens(6).length
