need :triangle

tc "triangle(4)", 10, triangle(4)
tc "triangle(1)", 1, triangle(1)
tc "triangle(0) -- an empty range", 0, triangle(0)
tc "triangle(100)", 5050, triangle(100)
uses(/\.sum\b/, "sum")
avoids(/\bwhile\b|\+=/, "a counting loop")
