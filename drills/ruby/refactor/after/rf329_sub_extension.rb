def with_extension(filename, ext)
  base = filename.sub(/\.[^.]*\z/, "")
  "#{base}.#{ext}"
end
