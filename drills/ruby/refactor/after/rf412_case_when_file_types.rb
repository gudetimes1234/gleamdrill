def file_kind(filename)
  case File.extname(filename).downcase
  when ".jpg", ".png", ".gif" then "image"
  when ".mp4", ".mov" then "video"
  when ".txt", ".md" then "text"
  else "other"
  end
end
