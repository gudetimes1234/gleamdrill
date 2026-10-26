def unique_emails(emails)
  emails.uniq { |email| email.downcase }
end
