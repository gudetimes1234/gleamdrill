def oldest(people)
  best = nil
  people.each do |person|
    if best.nil? || person[:age] > best[:age]
      best = person
    end
  end
  best
end
