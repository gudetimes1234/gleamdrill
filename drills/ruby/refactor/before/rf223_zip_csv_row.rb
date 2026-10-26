def row_to_hash(headers, values)
  row = {}
  headers.each_with_index do |header, i|
    row[header] = values[i]
  end
  row
end
