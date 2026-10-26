need :conversion_table

tc "conversion_table(0, 20, 10)", ["0C = 32F", "10C = 50F", "20C = 68F"], conversion_table(0, 20, 10)
tc "conversion_table(-40, -30, 5)", ["-40C = -40F", "-35C = -31F", "-30C = -22F"], conversion_table(-40, -30, 5)
tc "conversion_table(5, 12, 5) -- stops before passing to", ["5C = 41F", "10C = 50F"], conversion_table(5, 12, 5)
tc "conversion_table(10, 0, 5) -- from past to", [], conversion_table(10, 0, 5)
uses(/\.step\b/, "step")
avoids(/\bwhile\b|\buntil\b/, "while loop")
avoids(/\+=/, "manual increment")
