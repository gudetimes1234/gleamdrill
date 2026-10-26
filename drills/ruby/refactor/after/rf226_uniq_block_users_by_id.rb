def dedupe_users(users)
  users.uniq(&:id)
end
