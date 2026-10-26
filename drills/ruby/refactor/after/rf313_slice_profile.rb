def public_profile(user)
  user.slice(:name, :email)
end
