need :is_valid

tc 'is_valid("()[]{}")', true, is_valid("()[]{}")
tc 'is_valid("(]")', false, is_valid("(]")
tc 'is_valid("([)]")', false, is_valid("([)]")
tc 'is_valid("{[]}")', true, is_valid("{[]}")
tc 'is_valid("(")', false, is_valid("(")
