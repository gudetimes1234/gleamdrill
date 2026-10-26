def charge(month, quantity, plan)
  if month >= 6 && month <= 8
    quantity * plan[:summer_rate]
  else
    quantity * plan[:regular_rate] + plan[:regular_service_charge]
  end
end
