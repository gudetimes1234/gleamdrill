def my_pow(x, n)
  return 1 / power(x, -n) if n.negative?

  power(x, n)
end

# Halving the exponent halves the work: x^n is (x^(n/2))^2, with one extra
# multiplication when n is odd. O(log n) multiplications rather than n.
def power(x, n)
  return 1.0 if n.zero?

  half = power(x, n / 2)
  n.odd? ? half * half * x : half * half
end
