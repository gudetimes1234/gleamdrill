need :delete_post

User = Struct.new(:name, :admin)
posts = [{ id: 1 }, { id: 2 }]
tc "delete_post(admin, posts, 1)", [{ id: 2 }], delete_post(User.new("ada", true), posts, 1)
tc "delete_post(guest, posts, 1) -- not allowed", [{ id: 1 }, { id: 2 }], delete_post(User.new("bob", false), posts, 1)
tc "delete_post(admin, posts, 9) -- no such post", [{ id: 1 }, { id: 2 }], delete_post(User.new("ada", true), posts, 9)
uses(/\bunless\b/, "unless")
avoids(/\bif\s*(!|not\b)/, "if not / if !")
