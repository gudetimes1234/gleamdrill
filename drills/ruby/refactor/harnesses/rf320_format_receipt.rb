need :receipt_line

tc 'receipt_line("Coffee", 3.5)', "Coffee          3.50", receipt_line("Coffee", 3.5)
tc 'receipt_line("Tip", 0) -- zero still shows cents', "Tip             0.00", receipt_line("Tip", 0)
tc 'receipt_line("Laptop", 1234.5)', "Laptop       1234.50", receipt_line("Laptop", 1234.5)
uses(/%-?\d*\.\d+f/, "a %.2f format")
avoids(/\.to_s\b/, "to_s")
avoids(/"\s*\*/, "padding with spaces by hand")
