require "set"

def coin_change(coins, amount)
  return 0 if amount.zero?

  # The amounts reachable with k coins form one level of a breadth-first
  # search from zero, so the first level containing the target is the answer.
  # Same bound as the table, but it stops the moment it arrives rather than
  # filling in every amount below the target.
  frontier = [0]
  seen = Set[0]
  used = 0

  until frontier.empty?
    used += 1
    following = []
    frontier.each do |total|
      coins.each do |coin|
        nxt = total + coin
        return used if nxt == amount

        following << nxt if nxt < amount && seen.add?(nxt)
      end
    end
    frontier = following
  end

  -1
end
