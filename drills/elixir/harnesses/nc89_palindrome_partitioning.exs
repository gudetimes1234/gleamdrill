# The order of pieces within a partition is the answer, so only the outer list
# is normalised. Comma rather than a pipe: a pipe sorts after letters.
sorted = fn s ->
  s |> Solution.partition() |> Enum.map(&Enum.join(&1, ",")) |> Enum.sort()
end

[
  {~S{partition("aab")}, inspect(["a,a,b", "aa,b"]), inspect(sorted.("aab"))},
  {~S{partition("a")}, inspect(["a"]), inspect(sorted.("a"))},
  {~S{partition("")}, inspect([""]), inspect(sorted.(""))},
  {~S{partition("aba")}, inspect(["a,b,a", "aba"]), inspect(sorted.("aba"))},
  {~S{partition("abc")}, inspect(["a,b,c"]), inspect(sorted.("abc"))}
]
