need :daily_temperatures

tc "daily_temperatures([73, 74, 75, 71, 69, 72, 76, 73])", [1, 1, 4, 2, 1, 1, 0, 0], daily_temperatures([73, 74, 75, 71, 69, 72, 76, 73])
tc "daily_temperatures([30, 40, 50, 60])", [1, 1, 1, 0], daily_temperatures([30, 40, 50, 60])
tc "daily_temperatures([30, 30, 30])", [0, 0, 0], daily_temperatures([30, 30, 30])
