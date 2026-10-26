def before_first_error(lines)
  kept = []
  lines.each do |line|
    break if line.start_with?("ERROR")
    kept << line
  end
  kept
end
