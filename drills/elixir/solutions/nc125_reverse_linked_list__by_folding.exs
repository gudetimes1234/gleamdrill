defmodule Solution do
  # The same accumulator, named by the standard library instead of written out.
  # Worth putting next to the hand-written loop: a left fold that prepends is
  # the definition of reversing, which is why Enum.reverse exists at all.
  def reverse_list(values), do: Enum.reduce(values, [], &[&1 | &2])
end
