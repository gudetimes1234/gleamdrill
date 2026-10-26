def tag_index(posts)
  index = {}
  posts.each do |post|
    post[:tags].each do |tag|
      if index[tag].nil?
        index[tag] = []
      end
      index[tag] << post[:title]
    end
  end
  index
end
