def public_profile(user)
  profile = {}
  [:name, :email].each do |key|
    profile[key] = user[key] if user.key?(key)
  end
  profile
end
