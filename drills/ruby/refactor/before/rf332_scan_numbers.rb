def numbers_in(text)
  numbers = []
  current = ""
  text.each_char do |char|
    if char =~ /\d/
      current += char
    elsif current != ""
      numbers << current.to_i
      current = ""
    end
  end
  numbers << current.to_i if current != ""
  numbers
end
