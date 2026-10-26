def numbers_in(text)
  text.scan(/\d+/).map(&:to_i)
end
