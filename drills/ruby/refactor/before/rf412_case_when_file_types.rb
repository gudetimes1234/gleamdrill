def file_kind(filename)
  ext = File.extname(filename).downcase
  if [".jpg", ".png", ".gif"].include?(ext)
    "image"
  elsif ext == ".mp4" || ext == ".mov"
    "video"
  elsif ext == ".txt" || ext == ".md"
    "text"
  else
    "other"
  end
end
