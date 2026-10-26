def failed_logins(events, user)
  events.count { |event| event[:user] == user && !event[:ok] }
end
