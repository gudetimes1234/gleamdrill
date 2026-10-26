def digits_only(phone)
  digits = ""
  phone.each_char do |char|
    digits += char if "0123456789".include?(char)
  end
  digits
end
