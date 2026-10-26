def normalize_headers(headers)
  headers.transform_keys(&:downcase)
end
