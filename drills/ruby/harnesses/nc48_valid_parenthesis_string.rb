need :check_valid_string

tc 'check_valid_string("()")', true, check_valid_string("()")
tc 'check_valid_string("(*)")', true, check_valid_string("(*)")
tc 'check_valid_string("(*))")', true, check_valid_string("(*))")
tc 'check_valid_string(")(")', false, check_valid_string(")(")
tc 'check_valid_string("")', true, check_valid_string("")
tc 'check_valid_string("*")', true, check_valid_string("*")
tc 'check_valid_string(")*")', false, check_valid_string(")*")
tc 'check_valid_string("(*()")', true, check_valid_string("(*()")
