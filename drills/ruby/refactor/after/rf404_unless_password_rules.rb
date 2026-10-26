def password_errors(password)
  errors = []
  errors << "needs a digit" unless password.match?(/\d/)
  errors << "too short" unless password.length >= 8
  errors
end
