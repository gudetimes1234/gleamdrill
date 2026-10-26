def present_names(names)
  names.reject { |name| name.strip.empty? }
end
