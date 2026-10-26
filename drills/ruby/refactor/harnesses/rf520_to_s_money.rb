need :Money, :receipt_line

tc 'receipt_line("Tea", Money.new(350))', "Tea: $3.50", receipt_line("Tea", Money.new(350))
tc 'receipt_line("Gift", Money.new(0)) -- free', "Gift: $0.00", receipt_line("Gift", Money.new(0))
tc 'receipt_line("Cake", Money.new(1999))', "Cake: $19.99", receipt_line("Cake", Money.new(1999))
tc "style: Money.new(1999).to_s", "$19.99", Money.new(1999).to_s
avoids(/to_string|describe/, "a to_string method")
