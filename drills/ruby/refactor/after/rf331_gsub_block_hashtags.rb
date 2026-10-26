def shout_tags(text)
  text.gsub(/#\w+/) { |tag| tag.upcase }
end
