def charge(month, quantity, plan)
  summer?(month) ? summer_charge(quantity, plan) : regular_charge(quantity, plan)
end

def summer?(month)
  (6..8).cover?(month)
end

def summer_charge(quantity, plan)
  quantity * plan[:summer_rate]
end

def regular_charge(quantity, plan)
  quantity * plan[:regular_rate] + plan[:regular_service_charge]
end
