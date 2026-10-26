def valid_email?(email)
  if email.include?("@") && email.end_with?(".com", ".org")
    true
  else
    false
  end
end
