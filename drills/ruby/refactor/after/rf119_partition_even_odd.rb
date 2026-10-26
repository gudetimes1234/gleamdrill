def split_even_odd(numbers)
  numbers.partition { |number| number.even? }
end
