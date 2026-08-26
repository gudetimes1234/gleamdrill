defmodule Solution do
  def eval_rpn(tokens) do
    case Enum.reduce(tokens, [], &step/2) do
      [answer | _] -> answer
      [] -> 0
    end
  end

  # Erlang's div already truncates towards zero, which is what the problem asks
  # for and what a flooring division does not do for negatives.
  defp step("+", [b, a | rest]), do: [a + b | rest]
  defp step("-", [b, a | rest]), do: [a - b | rest]
  defp step("*", [b, a | rest]), do: [a * b | rest]
  defp step("/", [b, a | rest]), do: [div(a, b) | rest]
  defp step(token, stack), do: [String.to_integer(token) | stack]
end
