def batches(emails, size)
  out = []
  i = 0
  while i < emails.length
    out << emails[i, size]
    i += size
  end
  out
end
