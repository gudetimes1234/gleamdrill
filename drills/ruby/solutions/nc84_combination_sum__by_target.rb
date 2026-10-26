def combination_sum(candidates, target)
  usable = candidates.select(&:positive?).sort

  # Bottom-up instead of by recursion: the combinations making a target are
  # every combination making a smaller amount with one more candidate added.
  # Requiring each added candidate to be no smaller than the combination's
  # largest is what keeps one combination from appearing in several orders.
  table = { 0 => [[]] }
  (1..target).each do |amount|
    found = []
    usable.each do |candidate|
      break if candidate > amount

      table.fetch(amount - candidate, []).each do |combination|
        found << [candidate] + combination if combination.empty? || candidate >= combination[0]
      end
    end
    table[amount] = found
  end

  table.fetch(target, [])
end
