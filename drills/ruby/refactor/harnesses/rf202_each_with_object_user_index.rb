need :index_by_id

User = Struct.new(:id, :name)
ann = User.new(7, "Ann")
bo = User.new(3, "Bo")
tc "index_by_id([ann, bo])", { 7 => ann, 3 => bo }, index_by_id([ann, bo])
tc "index_by_id([])", {}, index_by_id([])
tc "index_by_id([ann, ann2]) -- a repeated id keeps the last", { 7 => User.new(7, "Ann 2") }, index_by_id([ann, User.new(7, "Ann 2")])
uses(/\.each_with_object\b/, "each_with_object")
avoids(/\bwhile\b/, "while loop")
avoids(/\+=/, "manual counter")
