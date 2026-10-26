def status_summary(log_lines)
  counts = Hash.new(0)
  i = 0
  while i < log_lines.length
    status = log_lines[i].split.last
    counts[status] += 1
    i += 1
  end
  counts
end
