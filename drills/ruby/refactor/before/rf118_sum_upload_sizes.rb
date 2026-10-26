def total_size(uploads)
  total = 0
  i = 0
  while i < uploads.length
    total = total + uploads[i].size
    i += 1
  end
  total
end
