def largest_file(sizes)
  name, _size = sizes.max_by { |_name, size| size }
  name
end
