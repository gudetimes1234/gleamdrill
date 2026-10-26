def with_extension(filename, ext)
  dot = filename.rindex(".")
  if dot.nil?
    filename + "." + ext
  else
    filename[0...dot] + "." + ext
  end
end
