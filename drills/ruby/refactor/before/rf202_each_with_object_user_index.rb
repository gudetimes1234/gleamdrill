def index_by_id(users)
  index = {}
  i = 0
  while i < users.length
    index[users[i].id] = users[i]
    i += 1
  end
  index
end
