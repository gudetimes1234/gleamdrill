def withdraw(balance, amount)
  raise ArgumentError, "insufficient funds" if amount > balance
  balance - amount
end
