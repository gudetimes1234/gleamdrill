def active_coupons(coupons, today)
  coupons.reject { |coupon| coupon[:expires] < today }
end
