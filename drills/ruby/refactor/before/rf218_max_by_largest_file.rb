def largest_file(sizes)
  best_name = nil
  best_size = -1
  sizes.each do |name, size|
    if size > best_size
      best_name = name
      best_size = size
    end
  end
  best_name
end
