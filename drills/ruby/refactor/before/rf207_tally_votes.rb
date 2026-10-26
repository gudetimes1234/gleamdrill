def vote_counts(ballots)
  counts = {}
  ballots.each do |ballot|
    if counts.key?(ballot)
      counts[ballot] = counts[ballot] + 1
    else
      counts[ballot] = 1
    end
  end
  counts
end
