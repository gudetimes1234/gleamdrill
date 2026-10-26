need :can_vote?

Voter = Struct.new(:age, :citizen)
tc "can_vote?(age 30, citizen)", true, can_vote?(Voter.new(30, true))
tc "can_vote?(age 18, citizen) -- boundary", true, can_vote?(Voter.new(18, true))
tc "can_vote?(age 17, citizen)", false, can_vote?(Voter.new(17, true))
tc "can_vote?(age 40, not a citizen)", false, can_vote?(Voter.new(40, false))
avoids(/\btrue\b|\bfalse\b/, "true/false literals")
avoids(/\breturn\b/, "explicit return")
avoids(/\bif\b/, "if")
