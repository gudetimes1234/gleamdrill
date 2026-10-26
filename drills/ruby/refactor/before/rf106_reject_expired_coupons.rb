def active_coupons(coupons, today)
  kept = []
  coupons.each do |coupon|
    if coupon[:expires] < today
      next
    end
    kept.push(coupon)
  end
  kept
end
