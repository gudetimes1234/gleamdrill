def split_even_odd(numbers)
  evens = []
  odds = []
  numbers.each do |n|
    if n.even?
      evens << n
    else
      odds << n
    end
  end
  [evens, odds]
end
