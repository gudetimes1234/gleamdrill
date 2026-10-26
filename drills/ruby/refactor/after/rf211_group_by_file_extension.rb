def by_extension(filenames)
  filenames.group_by { |name| File.extname(name) }
end
