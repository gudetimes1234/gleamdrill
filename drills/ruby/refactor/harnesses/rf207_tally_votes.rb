need :vote_counts

tc 'vote_counts(%w[kim lee kim kim])', { "kim" => 3, "lee" => 1 }, vote_counts(%w[kim lee kim kim])
tc "vote_counts([])", {}, vote_counts([])
tc "vote_counts([:yes, :no, :no]) -- keys in first-seen order", { yes: 1, no: 2 }, vote_counts([:yes, :no, :no])
uses(/\.tally\b/, "tally")
avoids(/\.each\b/, "each loop")
avoids(/\+\s*1\b|\+=/, "adding one by hand")
