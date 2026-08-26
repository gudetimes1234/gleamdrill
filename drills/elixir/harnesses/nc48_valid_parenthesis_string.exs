[
  {~S{check_valid_string("()")}, inspect(true), inspect(Solution.check_valid_string("()"))},
  {~S{check_valid_string("(*)")}, inspect(true), inspect(Solution.check_valid_string("(*)"))},
  {~S{check_valid_string("(*))")}, inspect(true), inspect(Solution.check_valid_string("(*))"))},
  {~S{check_valid_string(")(")}, inspect(false), inspect(Solution.check_valid_string(")("))},
  {~S{check_valid_string("")}, inspect(true), inspect(Solution.check_valid_string(""))},
  {~S{check_valid_string("*")}, inspect(true), inspect(Solution.check_valid_string("*"))},
  {~S{check_valid_string(")*")}, inspect(false), inspect(Solution.check_valid_string(")*"))},
  {~S{check_valid_string("(*()")}, inspect(true), inspect(Solution.check_valid_string("(*()"))}
]
