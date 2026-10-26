def roster(employees)
  employees.sort do |a, b|
    if a[:dept] == b[:dept]
      a[:name] <=> b[:name]
    else
      a[:dept] <=> b[:dept]
    end
  end
end
