def can_vote?(person)
  person.age >= 18 && person.citizen
end
