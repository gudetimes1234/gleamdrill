need :any_admin?

Account = Struct.new(:name, :role)
ada = Account.new("Ada", :admin)
bob = Account.new("Bob", :member)
tc "any_admin?([bob, ada])", true, any_admin?([bob, ada])
tc "any_admin?([bob])", false, any_admin?([bob])
tc "any_admin?([]) -- nobody, so no admin", false, any_admin?([])
uses(/\.any\?/, "any?")
avoids(/\.each\b/, "each loop")
avoids(/\breturn\b|\btrue\b|\bfalse\b/, "returning true or false by hand")
