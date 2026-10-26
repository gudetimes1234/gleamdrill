need :temperature_range

tc "temperature_range([12, -3, 7, 21])", [-3, 21], temperature_range([12, -3, 7, 21])
tc "temperature_range([]) -- [nil, nil]", [nil, nil], temperature_range([])
tc "temperature_range([5])", [5, 5], temperature_range([5])
uses(/\.minmax\b/, "minmax")
avoids(/\.each\b/, "each loop")
avoids(/\bif\b/, "comparing by hand")
