def seat_map(guests)
  seats = {}
  seat = 1
  guests.each do |guest|
    seats[guest] = seat
    seat += 1
  end
  seats
end
