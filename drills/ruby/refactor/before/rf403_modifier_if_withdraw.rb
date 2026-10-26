def withdraw(balance, amount)
  if amount > balance
    raise ArgumentError, "insufficient funds"
  end
  balance - amount
end
