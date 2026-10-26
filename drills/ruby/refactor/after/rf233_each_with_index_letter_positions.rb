def positions_of(letters, target)
  letters.each_with_index.filter_map { |letter, index| index if letter == target }
end
