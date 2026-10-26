need :shipping_fee

tc "shipping_fee({ express: true })", 15, shipping_fee({ express: true })
tc "shipping_fee({ express: false })", 5, shipping_fee({ express: false })
tc "shipping_fee({}) -- missing key is nil, so standard", 5, shipping_fee({})
uses(/\S\s+\?\s+\S[^\n]*\s:\s/, "a ternary")
avoids(/\bif\b|\belse\b/, "if/else")
avoids(/\breturn\b/, "return")
