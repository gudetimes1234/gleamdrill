defmodule Solution do
  def my_pow(x, n) when n < 0, do: 1 / power(x, -n)
  def my_pow(x, n), do: power(x, n)

  # Halving the exponent halves the work: x^n is (x^(n/2))^2, with one extra
  # multiplication when n is odd. O(log n) multiplications rather than n.
  defp power(_x, 0), do: 1.0

  defp power(x, n) do
    half = power(x, div(n, 2))
    if rem(n, 2) == 0, do: half * half, else: half * half * x
  end
end
