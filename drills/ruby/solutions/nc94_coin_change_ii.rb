def change(amount, coins)
  # Combinations, not permutations, and that is entirely decided by the loop
  # order. Coins on the outside means each coin is considered once and for all
  # before the next is looked at, so 1+2 and 2+1 can never both be counted.
  # Swapping the loops would count orderings instead.
  ways = Array.new(amount + 1, 0)
  ways[0] = 1

  coins.each do |coin|
    next if coin <= 0

    (coin..amount).each { |target| ways[target] += ways[target - coin] }
  end

  ways[amount]
end
