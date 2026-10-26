def check_email(email)
  raise RuntimeError.new("invalid email: #{email}") unless email.include?("@")
  email.downcase
end
