def my_pow(x, n)
  magnitude = 1.0
  n.abs.times { magnitude *= x }
  n.negative? ? 1 / magnitude : magnitude
end
