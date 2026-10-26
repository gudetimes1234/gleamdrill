def pluralize(count, word)
  suffix = count == 1 ? "" : "s"
  "#{count} #{word}#{suffix}"
end
