need :Basket, :checkout_message

tc "checkout_message(Basket.new([3, 4]))", "Total: 7", checkout_message(Basket.new([3, 4]))
tc "checkout_message(Basket.new([])) -- empty", "Your basket is empty", checkout_message(Basket.new([]))
tc "checkout_message(Basket.new([0])) -- a free item still counts", "Total: 0", checkout_message(Basket.new([0]))
tc "style: Basket#empty? and Basket#total", true, Basket.new([]).respond_to?(:empty?) && Basket.new([]).respond_to?(:total)
avoids(/\b(is|get)_\w+/, "is_ or get_ prefixes")
