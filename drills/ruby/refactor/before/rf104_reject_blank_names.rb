def present_names(names)
  result = []
  names.each do |name|
    result << name unless name.strip.empty?
  end
  result
end
