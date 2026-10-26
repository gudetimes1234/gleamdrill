require "set"

def alien_order(words)
  letters = words.flat_map(&:chars).to_set

  after = letters.to_h { |letter| [letter, []] }
  words.each_cons(2) do |first, second|
    at = (0...[first.length, second.length].min).find { |i| first[i] != second[i] }
    if at
      after[first[at]] << second[at]
    elsif first.length > second.length
      return ""
    end
  end

  # Depth-first, recording a letter only once everything that must follow it
  # has been recorded, and recording it by prepending, which is what puts it
  # back in front of them. The in-progress set is the cycle check: a letter
  # met again on the current path contradicts itself.
  on_path = Set.new
  done = Set.new
  order = []

  visit = lambda do |letter|
    return false if on_path.include?(letter)
    return true if done.include?(letter)

    on_path << letter
    return false unless after[letter].all? { |following| visit.call(following) }

    on_path.delete(letter)
    done << letter
    order.unshift(letter)
    true
  end

  letters.all? { |letter| visit.call(letter) } ? order.join : ""
end
