def change(amount, coins)
  usable = coins.select(&:positive?)
  memo = {}

  # The same "combinations not permutations" rule stated as a choice instead
  # of a loop order: either use this coin again, or set it aside for good.
  # Setting it aside permanently is what fixes one order per combination.
  ways = lambda do |index, remaining|
    return 1 if remaining.zero?
    return 0 if index >= usable.length

    memo[[index, remaining]] ||= begin
      using = usable[index] <= remaining ? ways.(index, remaining - usable[index]) : 0
      using + ways.(index + 1, remaining)
    end
  end

  ways.(0, amount)
end
