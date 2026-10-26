need :best_scores

tc 'best_scores({ "ann" => [3, 9, 4], "bo" => [7] })', { "ann" => 9, "bo" => 7 }, best_scores({ "ann" => [3, 9, 4], "bo" => [7] })
tc 'best_scores({ "cy" => [] }) -- no scores, nil', { "cy" => nil }, best_scores({ "cy" => [] })
tc "best_scores({})", {}, best_scores({})
uses(/\.transform_values\b/, "transform_values")
avoids(/\.each\b|\.keys\b/, "walking the keys")
