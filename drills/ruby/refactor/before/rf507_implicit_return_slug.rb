def slugify(title)
  slug = title.strip.downcase.tr(" ", "-")
  return slug
end
