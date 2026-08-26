defmodule Solution do
  # Fold the digits into a number, add one, take it apart again. Shorter, and in
  # Elixir it is even safe -- integers are arbitrary precision. In a language
  # where they are not, this is exactly the version that breaks, and handing you
  # digits rather than a number is the problem saying so.
  def plus_one(digits) do
    value = Enum.reduce(digits, 0, fn digit, acc -> acc * 10 + digit end)
    Integer.digits(value + 1)
  end
end
