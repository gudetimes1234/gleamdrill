def numbered(lines)
  out = []
  for i in 0...lines.length
    out << "#{i + 1}. #{lines[i]}"
  end
  out
end
