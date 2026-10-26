def describe(value)
  case value
  when Integer then "number #{value}"
  when String then "text #{value}"
  when Array then "list of #{value.size}"
  when nil then "nothing"
  else "unknown"
  end
end
