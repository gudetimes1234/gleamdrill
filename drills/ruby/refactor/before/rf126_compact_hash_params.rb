def present_fields(params)
  result = {}
  params.each do |key, value|
    result[key] = value unless value.nil?
  end
  result
end
