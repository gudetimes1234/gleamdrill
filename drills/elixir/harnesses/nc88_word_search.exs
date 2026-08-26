board = Enum.map(["ABCE", "SFCS", "ADEE"], &String.graphemes/1)

[
  {~S{exist(board, "ABCCED")}, inspect(true), inspect(Solution.exist(board, "ABCCED"))},
  {~S{exist(board, "SEE")}, inspect(true), inspect(Solution.exist(board, "SEE"))},
  {~S{exist(board, "ABCB")}, inspect(false), inspect(Solution.exist(board, "ABCB"))},
  {~S{exist(board, "")}, inspect(true), inspect(Solution.exist(board, ""))},
  {~S{exist(board, "Z")}, inspect(false), inspect(Solution.exist(board, "Z"))},
  {~S{exist([], "A")}, inspect(false), inspect(Solution.exist([], "A"))}
]
