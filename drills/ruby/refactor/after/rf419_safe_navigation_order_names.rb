def shout_name(order)
  order&.customer&.name&.upcase
end
