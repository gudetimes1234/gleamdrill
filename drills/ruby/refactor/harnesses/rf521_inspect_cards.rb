need :Card, :hand_summary

tc 'hand_summary([Card.new("Q", "H"), Card.new(3, "S")])', "[#<Card QH>, #<Card 3S>]", hand_summary([Card.new("Q", "H"), Card.new(3, "S")])
tc "hand_summary([]) -- no cards", "[]", hand_summary([])
tc 'hand_summary([Card.new("A", "D")])', "[#<Card AD>]", hand_summary([Card.new("A", "D")])
tc 'style: Card.new("A", "D").inspect', "#<Card AD>", Card.new("A", "D").inspect
avoids(/debug_string/, "a debug_string method")
avoids(/\.join\b/, "joining by hand")
