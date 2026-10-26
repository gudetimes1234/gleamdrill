def progress(done, total)
  step = done.to_s
  step = "0" + step if step.length == 1
  percent = (done * 100 / total).to_s
  "Step " + step + " of " + total.to_s + " (" + percent + "%)"
end
