need :exist

board = ["ABCE", "SFCS", "ADEE"].map(&:chars)

tc 'exist(board, "ABCCED")', true, exist(board, "ABCCED")
tc 'exist(board, "SEE")', true, exist(board, "SEE")
tc 'exist(board, "ABCB")', false, exist(board, "ABCB")
tc 'exist(board, "")', true, exist(board, "")
tc 'exist(board, "Z")', false, exist(board, "Z")
tc 'exist([], "A")', false, exist([], "A")
