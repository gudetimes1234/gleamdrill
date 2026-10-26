def split_cents(cents)
  dollars = cents / 100
  rest = cents - dollars * 100
  [dollars, rest]
end
