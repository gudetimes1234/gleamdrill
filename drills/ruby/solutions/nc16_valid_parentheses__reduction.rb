def is_valid(s)
  previous = nil
  while previous != s
    previous = s
    s = s.gsub(/\(\)|\[\]|\{\}/, "")
  end
  s.empty?
end
