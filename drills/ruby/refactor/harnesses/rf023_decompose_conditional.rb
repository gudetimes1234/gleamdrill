need :charge

plan = { summer_rate: 2, regular_rate: 3, regular_service_charge: 10 }
tc "charge(7, 5, plan) -- summer", 10, charge(7, 5, plan)
tc "charge(6, 1, plan) -- June counts", 2, charge(6, 1, plan)
tc "charge(9, 5, plan) -- regular", 25, charge(9, 5, plan)
tc "style: the condition and both branches are methods", true, Drill.code.scan(/\bdef /).length >= 4
avoids(/&&/, "&& range check")
