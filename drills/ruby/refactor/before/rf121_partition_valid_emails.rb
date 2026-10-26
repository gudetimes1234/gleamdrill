def split_emails(emails)
  valid = []
  invalid = []
  i = 0
  while i < emails.length
    if emails[i].include?("@")
      valid.push(emails[i])
    else
      invalid.push(emails[i])
    end
    i += 1
  end
  [valid, invalid]
end
