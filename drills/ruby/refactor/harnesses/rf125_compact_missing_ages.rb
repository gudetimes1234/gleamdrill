need :known_ages

tc "known_ages([31, nil, 0, nil, 54])", [31, 0, 54], known_ages([31, nil, 0, nil, 54])
tc "known_ages([nil, nil]) -- all missing", [], known_ages([nil, nil])
tc "known_ages([])", [], known_ages([])
uses(/\.compact\b/, "compact")
avoids(/\bnil\b/, "a nil check")
avoids(/\.(select|filter|reject)\b/, "select")
