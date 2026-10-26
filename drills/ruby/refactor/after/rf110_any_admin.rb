def any_admin?(users)
  users.any? { |user| user.role == :admin }
end
