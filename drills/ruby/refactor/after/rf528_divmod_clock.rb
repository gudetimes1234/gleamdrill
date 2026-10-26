def clock(minutes)
  hours, mins = minutes.divmod(60)
  format("%d:%02d", hours, mins)
end
