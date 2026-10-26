def password_errors(password)
  errors = []
  if !password.match?(/\d/)
    errors << "needs a digit"
  end
  if !(password.length >= 8)
    errors << "too short"
  end
  errors
end
