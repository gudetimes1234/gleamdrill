def generate_parenthesis(n)
  compose(n)
end

# Every non-empty balanced string is "(" + A + ")" + B for exactly one split: A
# is whatever the first bracket encloses, B is whatever follows it. Enumerating
# the splits enumerates the strings, with no validity rule to check at all.
def compose(n)
  return [""] if n <= 0

  (0...n).flat_map do |inner|
    compose(inner).product(compose(n - 1 - inner)).map { |a, b| "(#{a})#{b}" }
  end
end
