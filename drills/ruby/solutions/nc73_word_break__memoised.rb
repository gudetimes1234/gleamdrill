require "set"

def word_break(s, word_dict)
  words = word_dict.to_set
  memo = {}

  # Top-down: from this position, does any dictionary word start here and
  # leave a suffix that also breaks? Without the cache the same suffix is
  # asked about once per way of reaching it, which is where the exponential
  # blow-up on inputs like "aaaa...b" comes from.
  breaks = lambda do |start|
    return true if start >= s.length

    memo[start] = ((start + 1)..s.length).any? { |stop| words.include?(s[start...stop]) && breaks.(stop) } unless memo.key?(start)
    memo[start]
  end

  breaks.(0)
end
