def split_emails(emails)
  emails.partition { |email| email.include?("@") }
end
