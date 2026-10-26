def strip_leading_comments(lines)
  lines.drop_while { |line| line.start_with?("#") }
end
