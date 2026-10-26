need :WeatherCache

asked = []
weather = WeatherCache.new(->(city) { asked << city; city.length * 2 })
tc 'temperature("Oslo")', 8, weather.temperature("Oslo")
tc 'temperature("Oslo") again', 8, weather.temperature("Oslo")
tc 'temperature("Rome")', 8, weather.temperature("Rome")
tc "cities asked of the api -- Oslo only once", ["Oslo", "Rome"], asked
uses(/\[[^\]\n]+\]\s*\|\|=/, "@cache[key] ||=")
avoids(/key\?|\.nil\?|\bif\b/, "check-then-store")
avoids(/\breturn\b/, "return")
