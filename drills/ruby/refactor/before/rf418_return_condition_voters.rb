def can_vote?(person)
  if person.age < 18
    return false
  end
  if person.citizen
    return true
  end
  false
end
