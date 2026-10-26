def status_summary(log_lines)
  log_lines.map { |line| line.split.last }.tally
end
