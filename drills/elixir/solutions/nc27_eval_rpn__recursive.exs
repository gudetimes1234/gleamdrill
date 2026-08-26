defmodule Solution do
  def eval_rpn(tokens) do
    {value, _rest} = take(Enum.reverse(tokens))
    value
  end

  # Read right to left: the last token is the outermost operator, and each
  # operator takes its right operand first because that is what sits nearer the
  # end. Returns the value and whatever is left to read.
  defp take([token | tail]) when token in ["+", "-", "*", "/"] do
    {right, tail} = take(tail)
    {left, tail} = take(tail)
    {apply_operator(token, left, right), tail}
  end

  defp take([token | tail]), do: {String.to_integer(token), tail}

  defp take([]), do: {0, []}

  defp apply_operator("+", a, b), do: a + b
  defp apply_operator("-", a, b), do: a - b
  defp apply_operator("*", a, b), do: a * b
  defp apply_operator("/", a, b), do: div(a, b)
end
