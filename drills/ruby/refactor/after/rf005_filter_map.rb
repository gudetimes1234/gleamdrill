def active_emails(users)
  users.filter_map { |user| user[:email] if user[:active] }
end
