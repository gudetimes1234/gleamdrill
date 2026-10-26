def plus_one(digits)
  # Fold the digits into a number, add one, take it apart again. Ruby integers
  # are arbitrary precision, so this is safe here; in a language where they are
  # not, this is exactly the version that breaks, and handing you digits rather
  # than a number is the problem saying so. Integer#digits comes back least
  # significant first, hence the reverse.
  value = digits.inject(0) { |acc, digit| acc * 10 + digit }
  (value + 1).digits.reverse
end
