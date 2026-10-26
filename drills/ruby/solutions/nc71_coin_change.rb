def coin_change(coins, amount)
  # Build up from zero: the cheapest way to make a target is one coin more
  # than the cheapest way to make what is left after removing some coin. An
  # amount with no entry is simply unreachable, which saves inventing a
  # sentinel for infinity.
  table = { 0 => 0 }

  (1..amount).each do |target|
    options = coins.filter_map { |coin| table[target - coin] if coin <= target }
    table[target] = options.min + 1 unless options.empty?
  end

  table.fetch(amount, -1)
end
