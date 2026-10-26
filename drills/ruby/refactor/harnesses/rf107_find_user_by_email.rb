need :user_with_email

User = Struct.new(:name, :email)
ada = User.new("Ada", "ada@example.com")
bob = User.new("Bob", "bob@example.com")
tc 'user_with_email([ada, bob], "bob@example.com")', bob, user_with_email([ada, bob], "bob@example.com")
tc 'user_with_email([ada, bob], "eve@example.com") -- not there', nil, user_with_email([ada, bob], "eve@example.com")
tc 'user_with_email([], "ada@example.com")', nil, user_with_email([], "ada@example.com")
uses(/\.(find|detect)\b/, "find")
avoids(/\.each\b/, "each loop")
avoids(/\breturn\b/, "early return")
