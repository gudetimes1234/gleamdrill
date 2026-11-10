need("invoice_lines")
BANNER = ["*" * 21, "    Customer Owes    ", "*" * 21]
tc('invoice_lines({"customer": "Ada", "orders": [10, 5]})', BANNER + ["name: Ada", "amount: 15"], invoice_lines({"customer": "Ada", "orders": [10, 5]}))
tc('invoice_lines({"customer": "Bo", "orders": []}) -- no orders', BANNER + ["name: Bo", "amount: 0"], invoice_lines({"customer": "Bo", "orders": []}))
tc('invoice_lines({"customer": "Cy", "orders": [2.5, 1]})', BANNER + ["name: Cy", "amount: 3.5"], invoice_lines({"customer": "Cy", "orders": [2.5, 1]}))
uses(r"^def (?!invoice_lines\b)\w+\(", "an extracted function")
avoids(r"(?ms)^def invoice_lines\((?:(?!^def ).)*\bfor\b", "the total loop inside invoice_lines")
avoids(r"(?ms)^def invoice_lines\((?:(?!^def ).)*\.center\(", "the banner built inside invoice_lines")
