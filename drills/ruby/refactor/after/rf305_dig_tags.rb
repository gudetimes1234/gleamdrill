def first_tag_name(post)
  post.dig("tags", 0, "name")
end
