def progress(done, total)
  format("Step %02d of %d (%d%%)", done, total, done * 100 / total)
end
