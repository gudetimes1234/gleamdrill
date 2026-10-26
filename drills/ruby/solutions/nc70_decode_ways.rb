def num_decodings(s)
  return 0 if s.empty?

  # Two rolling counts. The ways to decode up to here are the ways up to the
  # previous character (if this one can stand alone) plus the ways up to the
  # one before that (if this one and its predecessor form a legal pair). A
  # leading zero kills the first branch; anything outside 10..26 the second.
  two_back = 1
  one_back = 1
  s.each_char.with_index do |c, i|
    alone = c == "0" ? 0 : one_back
    paired = i.positive? && (10..26).cover?(s[i - 1, 2].to_i) ? two_back : 0
    two_back, one_back = one_back, alone + paired
  end

  one_back
end
