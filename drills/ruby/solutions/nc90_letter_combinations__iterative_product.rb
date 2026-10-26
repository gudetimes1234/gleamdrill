KEYPAD = {
  "2" => "abc", "3" => "def", "4" => "ghi", "5" => "jkl",
  "6" => "mno", "7" => "pqrs", "8" => "tuv", "9" => "wxyz"
}.freeze

def letter_combinations(digits)
  return [] if digits.empty?

  # The same cross product built by folding rather than recursing: hold every
  # combination of the digits seen so far and extend each by every letter of
  # the next. No call stack, and the growth is visible: the list multiplies
  # in size at each step.
  digits.each_char.reduce([""]) do |combinations, digit|
    combinations.flat_map { |prefix| KEYPAD.fetch(digit, "").chars.map { |letter| prefix + letter } }
  end
end
