def group_anagrams(strs)
  groups = Hash.new { |hash, key| hash[key] = [] }
  strs.each do |word|
    counts = Array.new(26, 0)
    word.each_byte { |b| counts[b - 97] += 1 }
    groups[counts] << word
  end
  groups.values
end
