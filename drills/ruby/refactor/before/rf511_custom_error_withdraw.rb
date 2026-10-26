def withdraw(balance, amount)
  if amount > balance
    raise "Insufficient funds: balance #{balance}, wanted #{amount}"
  end
  balance - amount
end
