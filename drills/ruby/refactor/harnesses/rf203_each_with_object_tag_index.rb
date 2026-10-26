need :tag_index

posts = [{ title: "Gems", tags: %w[ruby tools] }, { title: "Blocks", tags: %w[ruby] }, { title: "Quiet", tags: [] }]
tc "tag_index(posts)", { "ruby" => %w[Gems Blocks], "tools" => %w[Gems] }, tag_index(posts)
tc "tag_index([])", {}, tag_index([])
tc 'tag_index([{ title: "Bare", tags: [] }]) -- no tags, no keys', {}, tag_index([{ title: "Bare", tags: [] }])
uses(/\.each_with_object\b/, "each_with_object")
avoids(/\bif\b|\bunless\b/, "if around the empty array")
avoids(/\.nil\?/, "nil? check")
