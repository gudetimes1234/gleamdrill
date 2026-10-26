def grade(score)
  case score
  when 90.. then "A"
  when 80...90 then "B"
  when 70...80 then "C"
  else "F"
  end
end
