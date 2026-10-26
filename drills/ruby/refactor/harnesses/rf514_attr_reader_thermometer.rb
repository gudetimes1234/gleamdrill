need :Thermometer

t = Thermometer.new(100, "kitchen")
tc 'Thermometer.new(100, "kitchen").celsius', 100, t.celsius
tc ".location", "kitchen", t.location
tc ".fahrenheit", 212.0, t.fahrenheit
tc 'Thermometer.new(0, "porch").fahrenheit -- freezing', 32.0, Thermometer.new(0, "porch").fahrenheit
uses(/attr_reader\s+:\w+/, "attr_reader")
avoids(/def\s+(celsius|location)\b/, "hand-written getters")
