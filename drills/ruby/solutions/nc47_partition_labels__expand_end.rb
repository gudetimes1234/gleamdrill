def partition_labels(s)
  # Grow the piece one character at a time until nothing inside it also
  # appears in what is left. No last-position map, the tail is asked
  # directly, which is far slower but is the condition stated outright.
  out = []
  rest = s
  until rest.empty?
    size = 1
    size += 1 while rest[0, size].each_char.any? { |c| rest[size..].include?(c) }
    out << size
    rest = rest[size..]
  end
  out
end
