def multiply(num1, num2)
  return "0" if num1 == "0" || num2 == "0"

  # Long multiplication exactly as taught: one partial product per digit of
  # the second number, each shifted left by its position, all added up. It
  # needs string addition as well as string multiplication, which is why the
  # accumulating version exists, but writing add once is worth it.
  total = "0"
  num2.reverse.each_char.with_index do |digit, shift|
    total = add(total, times_digit(num1, digit.to_i) + "0" * shift)
  end
  total
end

def times_digit(number, digit)
  out = []
  carry = 0
  number.reverse.each_char do |c|
    product = c.to_i * digit + carry
    out << product % 10
    carry = product / 10
  end
  out << carry if carry.positive?
  text = out.reverse.join.sub(/\A0+/, "")
  text.empty? ? "0" : text
end

def add(left, right)
  out = []
  carry = 0
  i = left.length - 1
  j = right.length - 1
  while i >= 0 || j >= 0 || carry.positive?
    total = carry
    if i >= 0
      total += left[i].to_i
      i -= 1
    end
    if j >= 0
      total += right[j].to_i
      j -= 1
    end
    out << total % 10
    carry = total / 10
  end
  text = out.reverse.join.sub(/\A0+/, "")
  text.empty? ? "0" : text
end
