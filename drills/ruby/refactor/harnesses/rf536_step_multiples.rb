need :multiples

tc "multiples(3, 10)", [3, 6, 9], multiples(3, 10)
tc "multiples(2, 2) -- the limit is included", [2], multiples(2, 2)
tc "multiples(5, 4) -- none fit", [], multiples(5, 4)
uses(/\.step\b/, "step")
avoids(/\bwhile\b|<<|\.push\b/, "a loop that pushes")
