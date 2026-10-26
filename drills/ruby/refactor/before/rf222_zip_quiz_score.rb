def score(answers, key)
  correct = 0
  answers.length.times do |i|
    correct += 1 if answers[i] == key[i]
  end
  correct
end
