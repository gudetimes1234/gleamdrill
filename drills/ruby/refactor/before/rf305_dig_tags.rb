def first_tag_name(post)
  tags = post["tags"]
  return nil if tags.nil? || tags.empty?
  tags[0]["name"]
end
