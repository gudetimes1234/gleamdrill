class InvalidEmail < ArgumentError; end

def check_email(email)
  raise InvalidEmail, "invalid email: #{email}" unless email.include?("@")

  email.downcase
end
