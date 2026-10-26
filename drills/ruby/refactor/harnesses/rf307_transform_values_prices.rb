need :discounted

tc 'discounted({ "tea" => 4, "cake" => 3.5 }, 10)', { "tea" => 3.6, "cake" => 3.15 }, discounted({ "tea" => 4, "cake" => 3.5 }, 10)
tc 'discounted({ "tea" => 4 }, 0) -- no discount', { "tea" => 4.0 }, discounted({ "tea" => 4 }, 0)
tc "discounted({}, 50)", {}, discounted({}, 50)
uses(/\.transform_values\b/, "transform_values")
avoids(/\.each\b|\.each_with_object\b|\.to_h\b|\.map\b/, "building a new hash by hand")
