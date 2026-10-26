def mentions(post)
  post.scan(/@(\w+)/).flatten
end
