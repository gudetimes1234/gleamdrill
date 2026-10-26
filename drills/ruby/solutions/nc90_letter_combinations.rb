KEYPAD = {
  "2" => "abc", "3" => "def", "4" => "ghi", "5" => "jkl",
  "6" => "mno", "7" => "pqrs", "8" => "tuv", "9" => "wxyz"
}.freeze

def letter_combinations(digits)
  return [] if digits.empty?

  build(digits)
end

# One choice per digit, independently, so the answer is the cross product of
# the letter sets. Written as a recursion here: pick a letter for the first
# digit, then every combination of the rest.
def build(digits)
  return [""] if digits.empty?

  tails = build(digits[1..])
  KEYPAD.fetch(digits[0], "").chars.flat_map { |letter| tails.map { |tail| letter + tail } }
end
