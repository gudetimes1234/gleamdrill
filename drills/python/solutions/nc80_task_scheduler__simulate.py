from collections import Counter


def leastInterval(tasks, n):
    # Run the schedule instead of computing it. Each round runs the n + 1 most
    # frequent tasks still outstanding -- which is the greedy choice, and needs
    # the collection to hand back its largest values over and over, exactly the
    # heap's job. Note the zeros are dropped before each round: a finished task
    # is not an idle slot, and counting it as one is the easy mistake here.
    remaining = list(Counter(tasks).values())
    elapsed = 0

    while True:
        outstanding = sorted((count for count in remaining if count > 0), reverse=True)
        if not outstanding:
            return elapsed

        running = outstanding[: n + 1]
        remaining = [count - 1 for count in running] + outstanding[n + 1:]

        # The last round costs only as many ticks as it actually uses.
        elapsed += n + 1 if any(count > 0 for count in remaining) else len(running)
