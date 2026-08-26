sorted = fn digits -> digits |> Solution.letter_combinations() |> Enum.sort() end

[
  {~S{letter_combinations("23")},
   inspect(["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]),
   inspect(sorted.("23"))},
  {~S{letter_combinations("")}, inspect([]), inspect(sorted.(""))},
  {~S{letter_combinations("2")}, inspect(["a", "b", "c"]), inspect(sorted.("2"))},
  {~S{letter_combinations("9")}, inspect(["w", "x", "y", "z"]), inspect(sorted.("9"))},
  {~S{letter_combinations("79") count}, inspect(16),
   inspect(length(Solution.letter_combinations("79")))}
]
