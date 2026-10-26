def adults_and_minors(members)
  adults = members.select { |member| member.age >= 18 }
  minors = members.reject { |member| member.age >= 18 }
  [adults, minors]
end
