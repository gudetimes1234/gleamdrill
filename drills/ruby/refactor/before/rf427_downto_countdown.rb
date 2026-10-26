def countdown(from)
  lines = []
  n = from
  while n >= 1
    lines << "#{n}..."
    n -= 1
  end
  lines << "liftoff"
  lines
end
