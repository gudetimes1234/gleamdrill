def is_match(s, p)
  # The same rules with no table at all. Shorter and easier to trust, and
  # exponential on patterns like "a*a*a*a*b" where the same suffix is reached
  # along many different splits. Worth writing first, then adding the cache
  # once it is right.
  return s.empty? if p.empty?

  here = !s.empty? && [s[0], "."].include?(p[0])

  if p.length >= 2 && p[1] == "*"
    return is_match(s, p[2..]) || (here && is_match(s[1..], p))
  end

  here && is_match(s[1..], p[1..])
end
