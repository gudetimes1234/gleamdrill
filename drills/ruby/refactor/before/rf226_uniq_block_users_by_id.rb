def dedupe_users(users)
  by_id = {}
  users.each do |user|
    by_id[user.id] = user unless by_id.key?(user.id)
  end
  by_id.values
end
