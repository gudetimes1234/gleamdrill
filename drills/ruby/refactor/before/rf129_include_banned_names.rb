def banned?(username, banned)
  found = false
  banned.each do |name|
    found = true if name == username
  end
  found
end
