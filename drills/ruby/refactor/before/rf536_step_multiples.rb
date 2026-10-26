def multiples(every, upto)
  result = []
  x = every
  while x <= upto
    result << x
    x += every
  end
  result
end
