need :check_inclusion

tc 'check_inclusion("ab", "eidbaooo")', true, check_inclusion("ab", "eidbaooo")
tc 'check_inclusion("ab", "eidboaoo")', false, check_inclusion("ab", "eidboaoo")
tc 'check_inclusion("adc", "dcda")', true, check_inclusion("adc", "dcda")
