def avatar_url(user)
  user && user.profile && user.profile.avatar
end
