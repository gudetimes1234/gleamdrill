def before_first_error(lines)
  lines.take_while { |line| !line.start_with?("ERROR") }
end
