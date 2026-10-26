def owing_report(name, orders)
  lines = []
  lines << "***********************"
  lines << "**** Customer Owes ****"
  lines << "***********************"

  outstanding = 0
  orders.each { |order| outstanding += order[:amount] }

  lines << "name: #{name}"
  lines << "amount: #{outstanding}"
  lines.join("\n")
end
