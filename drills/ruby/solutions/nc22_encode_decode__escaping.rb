def encode(strs)
  # Escape the separator, and escape the escape, in one pass.
  strs.map { |s| "|" + s.gsub(/[\\|]/) { |char| "\\" + char } }.join
end

def decode(s)
  # The leading separator is what tells [] and [""] apart: one encodes to the
  # empty string, the other to a lone separator.
  return [] if s.empty?

  out = []
  current = +""
  i = 1
  while i < s.length
    if s[i] == "\\"
      current << s[i + 1]
      i += 2
    elsif s[i] == "|"
      out << current
      current = +""
      i += 1
    else
      current << s[i]
      i += 1
    end
  end
  out << current
end
