def any_admin?(users)
  users.each do |user|
    return true if user.role == :admin
  end
  false
end
