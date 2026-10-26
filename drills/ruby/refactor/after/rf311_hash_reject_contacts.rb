def with_email(contacts)
  contacts.reject { |_name, email| email.nil? || email.empty? }
end
