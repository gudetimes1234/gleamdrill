def drain(queue)
  served = []
  while true
    job = queue.shift
    if job.nil?
      break
    end
    served << job.upcase
  end
  served
end
