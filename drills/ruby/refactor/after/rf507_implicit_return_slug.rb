def slugify(title)
  title.strip.downcase.tr(" ", "-")
end
