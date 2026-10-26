def batches(emails, size)
  emails.each_slice(size).to_a
end
