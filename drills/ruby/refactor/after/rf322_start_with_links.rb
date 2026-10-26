def link_kind(url)
  if url.start_with?("https://")
    "secure"
  elsif url.start_with?("http://")
    "plain"
  else
    "other"
  end
end
