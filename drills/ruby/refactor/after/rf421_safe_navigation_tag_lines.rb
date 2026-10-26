def tag_line(post)
  post.tags&.join(", ") || "untagged"
end
