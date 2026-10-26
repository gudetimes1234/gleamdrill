def image_file?(name)
  lower = name.downcase
  lower[-4..] == ".png" || lower[-4..] == ".jpg" || lower[-4..] == ".gif"
end
