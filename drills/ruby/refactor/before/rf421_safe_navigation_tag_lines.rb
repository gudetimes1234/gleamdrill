def tag_line(post)
  if post.tags.nil?
    "untagged"
  else
    post.tags.join(", ")
  end
end
