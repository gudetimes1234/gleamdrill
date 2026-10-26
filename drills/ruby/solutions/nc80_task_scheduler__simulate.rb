def least_interval(tasks, n)
  # Run the schedule instead of computing it. Each round runs the n + 1 most
  # frequent tasks still outstanding, which is the greedy choice, and needs
  # the collection to hand back its largest values over and over, exactly the
  # heap's job. Note the zeros are dropped before each round: a finished task
  # is not an idle slot, and counting it as one is the easy mistake here.
  remaining = tasks.tally.values
  elapsed = 0

  loop do
    outstanding = remaining.select(&:positive?).sort.reverse
    return elapsed if outstanding.empty?

    running = outstanding.first(n + 1)
    remaining = running.map { |count| count - 1 } + outstanding.drop(n + 1)

    # The last round costs only as many ticks as it actually uses.
    elapsed += remaining.any?(&:positive?) ? n + 1 : running.length
  end
end
