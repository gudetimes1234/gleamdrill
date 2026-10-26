def by_extension(filenames)
  groups = {}
  i = 0
  while i < filenames.length
    ext = File.extname(filenames[i])
    groups[ext] = [] unless groups.key?(ext)
    groups[ext].push(filenames[i])
    i += 1
  end
  groups
end
