def best_of(round1, round2)
  round1.merge(round2) { |_name, first, second| [first, second].max }
end
