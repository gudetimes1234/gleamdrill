need :dedupe_users

Member = Struct.new(:id, :name)
ann = Member.new(1, "Ann")
bo = Member.new(2, "Bo")
tc "dedupe_users([ann, bo, ann again]) -- the first record wins", [ann, bo], dedupe_users([ann, bo, Member.new(1, "Ann (old)")])
tc "dedupe_users([])", [], dedupe_users([])
tc "dedupe_users([bo])", [bo], dedupe_users([bo])
uses(/\.uniq\s*(\{|do|\(&)/, "uniq with a block")
avoids(/key\?|\.values\b/, "a hash of seen ids")
avoids(/\.each\b/, "each loop")
