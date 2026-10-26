def parse_env(lines)
  lines.to_h { |line| line.split("=", 2) }
end
