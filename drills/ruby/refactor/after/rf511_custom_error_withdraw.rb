class InsufficientFunds < StandardError; end

def withdraw(balance, amount)
  raise InsufficientFunds, "balance #{balance}, wanted #{amount}" if amount > balance

  balance - amount
end
