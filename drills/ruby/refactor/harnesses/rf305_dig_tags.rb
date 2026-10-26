need :first_tag_name

post = { "title" => "Hi", "tags" => [{ "name" => "ruby" }, { "name" => "gleam" }] }
tc "first_tag_name(post)", "ruby", first_tag_name(post)
tc 'first_tag_name({ "tags" => [] }) -- no tags', nil, first_tag_name({ "tags" => [] })
tc 'first_tag_name({ "title" => "Hi" }) -- no tags key', nil, first_tag_name({ "title" => "Hi" })
uses(/\.dig\b/, "dig")
avoids(/\.nil\?|\.empty\?|\breturn\b|\bif\b/, "guard checks")
