def initials(staff)
  staff.to_h do |person|
    ["#{person[:first]} #{person[:last]}", person[:first][0] + person[:last][0]]
  end
end
