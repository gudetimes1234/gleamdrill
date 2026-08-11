[
  {~s|valid?("()[]{}")|, inspect(true), inspect(Solution.valid?("()[]{}"))},
  {~s|valid?("(]")|, inspect(false), inspect(Solution.valid?("(]"))},
  {~s|valid?("([)]")|, inspect(false), inspect(Solution.valid?("([)]"))},
  {~s|valid?("{[]}")|, inspect(true), inspect(Solution.valid?("{[]}"))},
  {~s|valid?("(")|, inspect(false), inspect(Solution.valid?("("))}
]
