def volume_level(level)
  if level < 0
    0
  elsif level > 100
    100
  else
    level
  end
end
