def positions_of(letters, target)
  found = []
  i = 0
  while i < letters.length
    found << i if letters[i] == target
    i += 1
  end
  found
end
