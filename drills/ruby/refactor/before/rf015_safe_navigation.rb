def city_of(user)
  if user != nil && user.address != nil
    user.address.city
  end
end
