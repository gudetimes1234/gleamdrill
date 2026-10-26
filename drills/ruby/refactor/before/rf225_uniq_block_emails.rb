def unique_emails(emails)
  seen = []
  result = []
  emails.each do |email|
    unless seen.include?(email.downcase)
      seen << email.downcase
      result << email
    end
  end
  result
end
