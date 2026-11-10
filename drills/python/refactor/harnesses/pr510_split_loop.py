need("summary")
staff = [{"age": 40, "salary": 100}, {"age": 22, "salary": 80}, {"age": 31, "salary": 90}]
tc("summary(staff)", (22, 270), summary(staff))
tc('summary([{"age": 50, "salary": 5}])', (50, 5), summary([{"age": 50, "salary": 5}]))
tc("summary([]) -- empty", (None, 0), summary([]))
uses(r"(?s)\bfor\b.*\bfor\b", "a separate loop (or pipeline) per job")
