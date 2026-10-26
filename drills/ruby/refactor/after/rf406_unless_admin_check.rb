def delete_post(user, posts, id)
  return posts unless user.admin
  posts.reject { |post| post[:id] == id }
end
