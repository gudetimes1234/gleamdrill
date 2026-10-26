need :shout_name

Customer = Struct.new(:name)
Order = Struct.new(:customer)
tc "shout_name(order by ada)", "ADA", shout_name(Order.new(Customer.new("ada")))
tc "shout_name(order with no customer)", nil, shout_name(Order.new(nil))
tc "shout_name(nil)", nil, shout_name(nil)
uses(/&\./, "safe navigation &.")
avoids(/\.nil\?|==\s*nil|!=\s*nil/, "nil checks")
avoids(/\breturn\b/, "return")
