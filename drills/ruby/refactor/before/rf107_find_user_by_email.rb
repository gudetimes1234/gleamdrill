def user_with_email(users, email)
  users.each do |user|
    if user.email == email
      return user
    end
  end
  nil
end
