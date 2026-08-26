defmodule Solution do
  # Ask a different question: is each of the three positions hit exactly by some
  # usable triplet? The answer is yes exactly when all three are covered -- the
  # same condition, arrived at without taking maxima.
  def merge_triplets(triplets, {ta, tb, tc}) do
    usable = Enum.filter(triplets, fn {a, b, c} -> a <= ta and b <= tb and c <= tc end)

    Enum.any?(usable, fn {a, _, _} -> a == ta end) and
      Enum.any?(usable, fn {_, b, _} -> b == tb end) and
      Enum.any?(usable, fn {_, _, c} -> c == tc end)
  end
end
