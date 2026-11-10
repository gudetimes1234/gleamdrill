need("charge")
plan = {"summer_rate": 2, "regular_rate": 3, "service_charge": 5}
tc("charge(7, 10, plan) -- summer", 20, charge(7, 10, plan))
tc("charge(1, 10, plan)", 35, charge(1, 10, plan))
tc("charge(6, 0, plan) -- first summer month, nothing used", 0, charge(6, 0, plan))
tc("charge(9, 1, plan) -- just after summer", 8, charge(9, 1, plan))
uses(r"\bif\s+(not\s+)?\w+\(\s*month\b", "a named condition function")
avoids(r"^\s*if\b[^:\n]*[<>]", "a raw month comparison in the if")
