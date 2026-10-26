def encode(strs)
  strs.map { |s| "#{s.length}##{s}" }.join
end

def decode(s)
  out = []
  i = 0
  while i < s.length
    hash_at = s.index("#", i)
    length = s[i...hash_at].to_i
    start = hash_at + 1
    out << s[start, length]
    i = start + length
  end
  out
end
