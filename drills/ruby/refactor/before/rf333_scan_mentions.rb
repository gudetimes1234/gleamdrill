def mentions(post)
  names = []
  post.split.each do |word|
    names << word[1..] if word.start_with?("@") && word.length > 1
  end
  names
end
