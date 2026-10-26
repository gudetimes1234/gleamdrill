need :User, :moderators

team = [User.new("Ada", true), User.new("Bo", false), User.new("Cy", true)]
tc "moderators(team)", ["Ada", "Cy"], moderators(team)
tc "moderators([User.new(\"Di\", false)]) -- nobody", [], moderators([User.new("Di", false)])
tc "moderators([]) -- empty", [], moderators([])
tc "style: User#admin?", true, User.new("x", true).respond_to?(:admin?)
avoids(/\bis_\w+/, "an is_ prefix")
