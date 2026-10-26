def drain(queue)
  served = []
  loop do
    job = queue.shift
    break if job.nil?

    served << job.upcase
  end
  served
end
