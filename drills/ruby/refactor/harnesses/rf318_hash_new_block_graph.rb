need :adjacency

tc "adjacency([[1, 2], [1, 3]])", { 1 => [2, 3], 2 => [1], 3 => [1] }, adjacency([[1, 2], [1, 3]])
tc "adjacency([]) -- no edges", {}, adjacency([])
tc 'adjacency([["a", "b"]])', { "a" => ["b"], "b" => ["a"] }, adjacency([["a", "b"]])
uses(/Hash\.new\s*(\{|do\b)/, "Hash.new with a block")
avoids(/\.nil\?|\bif\b|\bunless\b|key\?/, "creating each list by hand")
