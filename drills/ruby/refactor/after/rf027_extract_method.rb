def owing_report(name, orders)
  [banner, details(name, outstanding(orders))].join("\n")
end

def banner
  ["*" * 23, "**** Customer Owes ****", "*" * 23].join("\n")
end

def outstanding(orders)
  orders.sum { |order| order[:amount] }
end

def details(name, amount)
  "name: #{name}\namount: #{amount}"
end
