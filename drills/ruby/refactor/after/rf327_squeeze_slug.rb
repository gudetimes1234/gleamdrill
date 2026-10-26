def slug(title)
  title.downcase.tr(" ", "-").squeeze("-")
end
