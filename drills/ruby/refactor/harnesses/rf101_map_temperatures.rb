need :to_fahrenheit

tc "to_fahrenheit([0, 100])", [32.0, 212.0], to_fahrenheit([0, 100])
tc "to_fahrenheit([-40]) -- where the scales meet", [-40.0], to_fahrenheit([-40])
tc "to_fahrenheit([]) -- nothing in, nothing out", [], to_fahrenheit([])
tc "to_fahrenheit([21.5])", [70.7], to_fahrenheit([21.5])
uses(/\.(map|collect)\b/, "map")
avoids(/\bwhile\b/, "while loop")
avoids(/<<|\.push\b/, "pushing into an accumulator")
