def image_file?(name)
  name.downcase.end_with?(".png", ".jpg", ".gif")
end
