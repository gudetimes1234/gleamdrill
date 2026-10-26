def total_size(uploads)
  uploads.sum { |upload| upload.size }
end
