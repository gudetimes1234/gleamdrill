def apply_coupon(total, coupon)
  total -= 10 if coupon == "SAVE10"
  total
end
