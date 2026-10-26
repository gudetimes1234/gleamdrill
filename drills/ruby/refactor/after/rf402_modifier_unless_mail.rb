def notify(user, outbox)
  outbox << "mail to #{user[:email]}" unless user[:opted_out]
  outbox
end
