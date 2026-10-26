def all_tags(posts)
  posts.map { |post| post[:tags] }.flatten
end
