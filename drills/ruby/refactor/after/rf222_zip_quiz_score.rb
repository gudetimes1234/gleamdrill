def score(answers, key)
  answers.zip(key).count { |given, right| given == right }
end
