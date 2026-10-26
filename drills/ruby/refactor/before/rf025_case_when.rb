def day_kind(day)
  if day == "sat" || day == "sun"
    "weekend"
  elsif day == "fri"
    "almost"
  elsif day == "mon" || day == "tue" || day == "wed" || day == "thu"
    "weekday"
  else
    "unknown"
  end
end
