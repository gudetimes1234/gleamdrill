def settings_lines(lines)
  out = []
  lines.each do |line|
    if !line.strip.empty?
      if !line.start_with?("#")
        out << line.strip
      end
    end
  end
  out
end
