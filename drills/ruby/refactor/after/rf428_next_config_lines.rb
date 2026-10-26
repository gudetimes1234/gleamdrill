def settings_lines(lines)
  out = []
  lines.each do |line|
    next if line.strip.empty?
    next if line.start_with?("#")

    out << line.strip
  end
  out
end
