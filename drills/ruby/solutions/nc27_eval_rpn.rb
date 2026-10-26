def eval_rpn(tokens)
  stack = []
  tokens.each do |token|
    if %w[+ - * /].include?(token) && stack.length >= 2
      b = stack.pop
      a = stack.pop
      stack << apply(token, a, b)
    else
      stack << Integer(token)
    end
  end
  stack.empty? ? 0 : stack.last
end

def apply(operator, a, b)
  case operator
  when "+" then a + b
  when "-" then a - b
  when "*" then a * b
  else
    # Ruby's / floors, so -3 / 2 is -2; the problem wants truncation towards zero.
    quotient = a.abs / b.abs
    (a.negative? != b.negative?) ? -quotient : quotient
  end
end
