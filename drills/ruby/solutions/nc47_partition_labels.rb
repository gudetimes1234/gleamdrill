def partition_labels(s)
  # Overwriting as we go leaves each character mapped to its last position.
  last = {}
  s.each_char.with_index { |c, i| last[c] = i }

  # A piece can only end where every character it contains has run out.
  # Extend the end to the furthest last-position seen; when the walk catches
  # up with it, the piece is closed.
  out = []
  start = 0
  finish = -1
  s.each_char.with_index do |c, i|
    finish = [finish, last[c]].max
    if i == finish
      out << finish - start + 1
      start = i + 1
    end
  end

  out
end
