def normalize_headers(headers)
  headers.map { |name, value| [name.downcase, value] }.to_h
end
