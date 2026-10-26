need :stock_label

tc "stock_label(3)", "in stock", stock_label(3)
tc "stock_label(0)", "sold out", stock_label(0)
tc "stock_label(-1) -- oversold", "sold out", stock_label(-1)
uses(/\S\s+\?\s+\S[^\n]*\s:\s/, "a ternary")
avoids(/\bif\b|\belse\b/, "if/else")
