def by_initial(names)
  groups = {}
  names.each do |name|
    groups[name[0]] ||= []
    groups[name[0]] << name
  end
  groups
end
