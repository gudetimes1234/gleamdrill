[
  {~S{eval_rpn(["2", "1", "+", "3", "*"])}, inspect(9),
   inspect(Solution.eval_rpn(["2", "1", "+", "3", "*"]))},
  {~S{eval_rpn(["4", "13", "5", "/", "+"])}, inspect(6),
   inspect(Solution.eval_rpn(["4", "13", "5", "/", "+"]))},
  {~S{eval_rpn(["-3", "2", "/"])}, inspect(-1), inspect(Solution.eval_rpn(["-3", "2", "/"]))},
  {~S{eval_rpn(["5"])}, inspect(5), inspect(Solution.eval_rpn(["5"]))},
  {"eval_rpn(the long one)", inspect(22),
   inspect(
     Solution.eval_rpn([
       "10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"
     ])
   )}
]
