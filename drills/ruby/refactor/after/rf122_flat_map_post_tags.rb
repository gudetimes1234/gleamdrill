def all_tags(posts)
  posts.flat_map { |post| post[:tags] }
end
