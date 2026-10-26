def email_domains(emails)
  domains = []
  for email in emails
    domains.push(email.split("@").last.downcase)
  end
  domains
end
