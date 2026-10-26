def eval_rpn(tokens)
  value, _ = take(tokens, tokens.length - 1)
  value
end

# Read right to left: the last token is the outermost operator, and each
# operator takes its right operand first because that is what sits nearer the
# end. Returns the value and the index still to be read.
def take(tokens, i)
  token = tokens[i]
  return [Integer(token), i - 1] unless %w[+ - * /].include?(token)

  right, i = take(tokens, i - 1)
  left, i = take(tokens, i)
  [apply(token, left, right), i]
end

def apply(operator, a, b)
  case operator
  when "+" then a + b
  when "-" then a - b
  when "*" then a * b
  else
    quotient = a.abs / b.abs
    (a.negative? != b.negative?) ? -quotient : quotient
  end
end
