def span(list)
  if list.length == 0
    "none"
  else
    "#{list[0]} to #{list[-1]}"
  end
end
