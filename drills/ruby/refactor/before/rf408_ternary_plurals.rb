def pluralize(count, word)
  suffix = ""
  if count != 1
    suffix = "s"
  end
  "#{count} #{word}#{suffix}"
end
