def max_profit(prices)
  memo = {}

  # The same three states as an explicit choice at each day: buy, sell, or do
  # nothing. After selling the recursion skips a day, which is the cooldown
  # stated where it happens rather than encoded in which value is read.
  best = lambda do |day, holding|
    return 0 if day >= prices.length

    memo[[day, holding]] ||= begin
      waiting = best.(day + 1, holding)
      acting =
        if holding
          prices[day] + best.(day + 2, false)
        else
          best.(day + 1, true) - prices[day]
        end
      [waiting, acting].max
    end
  end

  best.(0, false)
end
