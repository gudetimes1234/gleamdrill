def rot13(text)
  text.chars.map do |char|
    if char =~ /[a-z]/
      ((char.ord - 97 + 13) % 26 + 97).chr
    elsif char =~ /[A-Z]/
      ((char.ord - 65 + 13) % 26 + 65).chr
    else
      char
    end
  end.join
end
