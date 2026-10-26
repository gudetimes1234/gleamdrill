def pay_amount(employee)
  return 0 if employee[:dead]
  return 100 if employee[:separated]
  return 200 if employee[:retired]

  employee[:salary]
end
