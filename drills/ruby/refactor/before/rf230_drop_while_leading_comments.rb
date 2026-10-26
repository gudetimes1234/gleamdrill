def strip_leading_comments(lines)
  i = 0
  while i < lines.length && lines[i].start_with?("#")
    i += 1
  end
  lines[i..]
end
