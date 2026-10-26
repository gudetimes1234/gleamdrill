def index_by_id(users)
  users.each_with_object({}) { |user, index| index[user.id] = user }
end
