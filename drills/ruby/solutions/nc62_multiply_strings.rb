def multiply(num1, num2)
  return "0" if num1 == "0" || num2 == "0"

  a = num1.reverse.chars.map(&:to_i)
  b = num2.reverse.chars.map(&:to_i)

  # Long multiplication with the carrying postponed. Digit i of one number
  # times digit j of the other always lands at position i + j, so every
  # product can be dropped straight into its slot and the carries settled in
  # one sweep at the end.
  slots = Array.new(a.length + b.length, 0)
  a.each_with_index do |x, i|
    b.each_with_index do |y, j|
      slots[i + j] += x * y
    end
  end

  carry = 0
  digits = []
  slots.each do |slot|
    total = slot + carry
    digits << total % 10
    carry = total / 10
  end

  text = digits.reverse.join.sub(/\A0+/, "")
  text.empty? ? "0" : text
end
