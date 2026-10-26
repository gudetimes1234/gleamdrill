need :banned?

tc 'banned?("spammer", ["troll", "spammer"])', true, banned?("spammer", ["troll", "spammer"])
tc 'banned?("ada", ["troll"])', false, banned?("ada", ["troll"])
tc 'banned?("ada", []) -- nobody is banned', false, banned?("ada", [])
uses(/\.(include\?|member\?)/, "include?")
avoids(/\.each\b/, "each loop")
avoids(/==|=\s*(true|false)\b/, "comparing by hand")
