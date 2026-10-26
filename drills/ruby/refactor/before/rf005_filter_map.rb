def active_emails(users)
  users.select { |user| user[:active] }.map { |user| user[:email] }
end
