def user_with_email(users, email)
  users.find { |user| user.email == email }
end
