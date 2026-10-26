need :withdraw

tc "withdraw(100, 30)", 70, withdraw(100, 30)
tc "withdraw(50, 50) -- down to zero", 0, withdraw(50, 50)
error = begin
  withdraw(10, 50)
  nil
rescue StandardError => e
  e
end
tc "withdraw(10, 50) raises", true, error.is_a?(StandardError)
tc "withdraw(10, 50) -- the message names the amount", true, error.message.include?("50")
tc "style: withdraw raises its own error class", true, error.class != RuntimeError && error.class < StandardError
uses(/<\s*\w*Error\b|Class\.new\(\s*\w*Error\s*\)/, "an error class")
avoids(/raise\s+["']/, "raise with only a string")
