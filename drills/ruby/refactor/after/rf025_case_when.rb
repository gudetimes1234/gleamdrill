def day_kind(day)
  case day
  when "sat", "sun" then "weekend"
  when "fri" then "almost"
  when "mon", "tue", "wed", "thu" then "weekday"
  else "unknown"
  end
end
