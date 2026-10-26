def with_email(contacts)
  result = contacts.dup
  contacts.each do |name, email|
    result.delete(name) if email.nil? || email.empty?
  end
  result
end
