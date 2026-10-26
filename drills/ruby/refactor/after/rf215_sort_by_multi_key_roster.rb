def roster(employees)
  employees.sort_by { |employee| [employee[:dept], employee[:name]] }
end
