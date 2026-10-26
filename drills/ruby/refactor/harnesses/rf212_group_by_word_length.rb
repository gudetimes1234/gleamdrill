need :words_by_length

tc 'words_by_length(%w[cat horse dog mouse ox])', { 3 => %w[cat dog], 5 => %w[horse mouse], 2 => %w[ox] }, words_by_length(%w[cat horse dog mouse ox])
tc "words_by_length([])", {}, words_by_length([])
tc 'words_by_length(["", "a"])', { 0 => [""], 1 => ["a"] }, words_by_length(["", "a"])
uses(/\.group_by\b/, "group_by")
avoids(/\.uniq\b/, "collecting the keys first")
avoids(/\.select\b/, "a select per group")
