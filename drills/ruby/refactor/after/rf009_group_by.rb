def by_initial(names)
  names.group_by { |name| name[0] }
end
