def slug(title)
  result = title.downcase.gsub(" ", "-")
  while result.include?("--")
    result = result.gsub("--", "-")
  end
  result
end
