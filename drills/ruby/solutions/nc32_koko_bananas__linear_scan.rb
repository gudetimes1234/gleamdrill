def min_eating_speed(piles, h)
  highest = piles.max
  speed = 1
  speed += 1 while speed < highest && hours(piles, speed) > h
  speed
end

def hours(piles, speed)
  piles.sum { |pile| (pile + speed - 1) / speed }
end
