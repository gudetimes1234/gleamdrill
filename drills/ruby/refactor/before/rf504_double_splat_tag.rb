def tag(name, attrs = {})
  parts = attrs.map { |key, value| " #{key}=\"#{value}\"" }
  "<#{name}#{parts.join}>"
end
