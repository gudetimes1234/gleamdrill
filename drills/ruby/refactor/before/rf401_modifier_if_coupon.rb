def apply_coupon(total, coupon)
  if coupon == "SAVE10"
    total -= 10
  end
  total
end
