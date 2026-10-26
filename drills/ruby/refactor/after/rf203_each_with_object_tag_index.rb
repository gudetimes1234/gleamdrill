def tag_index(posts)
  posts.each_with_object(Hash.new { |hash, tag| hash[tag] = [] }) do |post, index|
    post[:tags].each { |tag| index[tag] << post[:title] }
  end
end
