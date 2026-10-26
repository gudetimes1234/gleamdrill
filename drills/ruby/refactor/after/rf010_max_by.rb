def oldest(people)
  people.max_by { |person| person[:age] }
end
