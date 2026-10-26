def adults_and_minors(members)
  members.partition { |member| member.age >= 18 }
end
