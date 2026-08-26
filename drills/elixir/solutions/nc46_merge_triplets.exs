defmodule Solution do
  # A triplet with any component above the target can never be used: merging
  # takes maxima, so that component would be stuck too high forever. Throw those
  # away and the rest can all be merged, because a max only ever helps.
  def merge_triplets(triplets, {ta, tb, tc} = target) do
    triplets
    |> Enum.filter(fn {a, b, c} -> a <= ta and b <= tb and c <= tc end)
    |> Enum.reduce({0, 0, 0}, fn {a, b, c}, {x, y, z} ->
      {max(x, a), max(y, b), max(z, c)}
    end)
    |> Kernel.==(target)
  end
end
