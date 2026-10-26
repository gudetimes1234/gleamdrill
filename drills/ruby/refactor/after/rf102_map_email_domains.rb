def email_domains(emails)
  emails.map { |email| email.split("@").last.downcase }
end
