defmodule Solution do
  def my_pow(x, n) do
    magnitude = Enum.reduce(1..abs(n)//1, 1.0, fn _, acc -> acc * x end)
    if n < 0, do: 1 / magnitude, else: magnitude
  end
end
