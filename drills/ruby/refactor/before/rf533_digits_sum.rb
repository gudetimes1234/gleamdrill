def digit_sum(n)
  total = 0
  while n > 0
    total += n % 10
    n /= 10
  end
  total
end
