def group_anagrams(strs)
  strs.group_by { |word| word.chars.sort.join }.values
end
