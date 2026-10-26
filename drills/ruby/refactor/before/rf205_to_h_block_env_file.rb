def parse_env(lines)
  env = {}
  i = 0
  while i < lines.length
    parts = lines[i].split("=", 2)
    env[parts[0]] = parts[1]
    i += 1
  end
  env
end
