def describe(value)
  if value.is_a?(Integer)
    "number #{value}"
  elsif value.is_a?(String)
    "text #{value}"
  elsif value.is_a?(Array)
    "list of #{value.size}"
  elsif value.nil?
    "nothing"
  else
    "unknown"
  end
end
