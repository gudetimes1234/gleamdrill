def initials(staff)
  pairs = staff.map do |person|
    full = person[:first] + " " + person[:last]
    [full, person[:first][0] + person[:last][0]]
  end
  Hash[pairs]
end
