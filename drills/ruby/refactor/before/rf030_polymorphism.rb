def plumage(bird)
  case bird[:type]
  when "european" then "average"
  when "african" then bird[:coconuts] > 2 ? "tired" : "average"
  when "norwegian_blue" then bird[:voltage] > 100 ? "scorched" : "beautiful"
  else "unknown"
  end
end
