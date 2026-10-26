def valid_email?(email)
  email.include?("@") && email.end_with?(".com", ".org")
end
