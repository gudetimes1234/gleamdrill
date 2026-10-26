need :min_distance

tc 'min_distance("horse", "ros")', 3, min_distance("horse", "ros")
tc 'min_distance("intention", "execution")', 5, min_distance("intention", "execution")
tc 'min_distance("", "abc")', 3, min_distance("", "abc")
tc 'min_distance("abc", "")', 3, min_distance("abc", "")
tc 'min_distance("abc", "abc")', 0, min_distance("abc", "abc")
tc 'min_distance("kitten", "sitting")', 3, min_distance("kitten", "sitting")
