need :numbered

tc 'numbered(["eggs", "milk"])', ["1. eggs", "2. milk"], numbered(["eggs", "milk"])
tc "numbered([])", [], numbered([])
uses(/with_index/, "each_with_index or with_index")
avoids(/\bfor\b/, "for loop")
avoids(/\[i\]/, "indexing by position")
