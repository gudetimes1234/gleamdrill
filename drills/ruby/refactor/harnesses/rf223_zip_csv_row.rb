need :row_to_hash

tc 'row_to_hash(%w[name age], ["Ann", "31"])', { "name" => "Ann", "age" => "31" }, row_to_hash(%w[name age], ["Ann", "31"])
tc "row_to_hash([], [])", {}, row_to_hash([], [])
tc 'row_to_hash(%w[name age], ["Bo"]) -- a short row pads with nil', { "name" => "Bo", "age" => nil }, row_to_hash(%w[name age], ["Bo"])
uses(/\.zip\b/, "zip")
avoids(/each_with_index|with_index/, "each_with_index")
avoids(/\[i\]/, "indexing the other array")
