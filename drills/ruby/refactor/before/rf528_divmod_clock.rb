def clock(minutes)
  hours = minutes / 60
  mins = minutes % 60
  format("%d:%02d", hours, mins)
end
