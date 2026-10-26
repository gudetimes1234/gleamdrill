def is_valid(s)
  pairs = { ")" => "(", "]" => "[", "}" => "{" }
  stack = []

  s.each_char do |char|
    if pairs.key?(char)
      return false if stack.empty? || stack.pop != pairs[char]
    else
      stack << char
    end
  end
  stack.empty?
end
