defmodule Solution do
  def max_product([]), do: 0

  # A negative number turns the best running product into the worst and the
  # worst into the best, so both have to be carried. Zero resets them both,
  # which falls out of taking the element itself as an option.
  def max_product([first | rest]) do
    {_high, _low, best} =
      Enum.reduce(rest, {first, first, first}, fn n, {high, low, best} ->
        candidates = [n, high * n, low * n]
        high = Enum.max(candidates)
        {high, Enum.min(candidates), max(best, high)}
      end)

    best
  end
end
