def pay_amount(employee)
  if employee[:dead]
    result = 0
  else
    if employee[:separated]
      result = 100
    else
      if employee[:retired]
        result = 200
      else
        result = employee[:salary]
      end
    end
  end
  result
end
