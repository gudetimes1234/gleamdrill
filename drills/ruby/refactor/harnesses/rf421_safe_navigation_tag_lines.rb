need :tag_line

Post = Struct.new(:tags)
tc "tag_line(tags ruby, gleam)", "ruby, gleam", tag_line(Post.new(["ruby", "gleam"]))
tc "tag_line(tags nil)", "untagged", tag_line(Post.new(nil))
tc "tag_line(tags []) -- empty is not nil", "", tag_line(Post.new([]))
uses(/&\./, "safe navigation &.")
avoids(/\.nil\?|==\s*nil|!=\s*nil/, "nil checks")
avoids(/\bif\b/, "if")
