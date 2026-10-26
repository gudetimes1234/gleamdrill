def link_kind(url)
  if url[0, 8] == "https://"
    "secure"
  elsif url[0, 7] == "http://"
    "plain"
  else
    "other"
  end
end
