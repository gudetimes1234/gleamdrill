need :shipping_for

tc 'shipping_for({ country: "NO", total: 500 })', 0, shipping_for({ country: "NO", total: 500 })
tc 'shipping_for({ country: "NO", total: 120 })', 49, shipping_for({ country: "NO", total: 120 })
tc 'shipping_for({ country: "SE", total: 1200 })', 0, shipping_for({ country: "SE", total: 1200 })
tc 'shipping_for({ country: "SE", total: 999 })', 149, shipping_for({ country: "SE", total: 999 })
uses(/\bin\s*[\[{\w][^\n]*\s(if|unless)\b/, "case/in with a guard")
avoids(/order\[/, "order[...] lookups")
avoids(/\belsif\b/, "elsif")
