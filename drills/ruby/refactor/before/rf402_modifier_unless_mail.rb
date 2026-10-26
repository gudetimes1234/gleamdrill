def notify(user, outbox)
  unless user[:opted_out]
    outbox << "mail to #{user[:email]}"
  end
  outbox
end
