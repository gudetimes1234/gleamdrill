def num_decodings(s)
  return 0 if s.empty?

  ways(s, 0, {})
end

# The same two choices as a recursion from the front: take one character, or
# take two if they read as 10 to 26. Reaching the end is one complete
# decoding, which is why the base case returns 1 rather than 0.
def ways(s, i, memo)
  return 1 if i >= s.length
  return 0 if s[i] == "0"

  memo[i] ||= begin
    total = ways(s, i + 1, memo)
    total += ways(s, i + 2, memo) if i + 1 < s.length && (10..26).cover?(s[i, 2].to_i)
    total
  end
end
