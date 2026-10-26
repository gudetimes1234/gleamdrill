need :num_islands

def board(rows) = rows.map(&:chars)

tc "num_islands(one big island)", 1, num_islands(board(["11110", "11010", "11000", "00000"]))
tc "num_islands(three islands)", 3, num_islands(board(["11000", "11000", "00100", "00011"]))
tc "num_islands(all water)", 0, num_islands(board(["000", "000"]))
tc "num_islands([])", 0, num_islands([])
tc "num_islands(diagonal squares are separate)", 2, num_islands(board(["10", "01"]))
