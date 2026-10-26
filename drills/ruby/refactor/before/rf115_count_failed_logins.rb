def failed_logins(events, user)
  total = 0
  i = 0
  while i < events.length
    total += 1 if events[i][:user] == user && !events[i][:ok]
    i += 1
  end
  total
end
