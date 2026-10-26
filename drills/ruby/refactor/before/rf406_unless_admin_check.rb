def delete_post(user, posts, id)
  if not user.admin
    return posts
  end
  posts.reject { |post| post[:id] == id }
end
