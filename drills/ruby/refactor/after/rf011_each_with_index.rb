def numbered(lines)
  lines.map.with_index(1) { |line, n| "#{n}. #{line}" }
end
