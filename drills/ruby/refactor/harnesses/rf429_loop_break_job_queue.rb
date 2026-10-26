need :drain

tc 'drain(["print", "mail"])', ["PRINT", "MAIL"], drain(["print", "mail"])
tc "drain([])", [], drain([])
q = ["a", "b"]
drain(q)
tc "queue after drain -- emptied", [], q
uses(/\bloop\s*(do\b|\{)|\buntil\b/, "loop do or until")
avoids(/\bwhile\s+true\b/, "while true")
