need :city_of

Address = Struct.new(:city)
Person = Struct.new(:address)
tc "city_of(person in Oslo)", "Oslo", city_of(Person.new(Address.new("Oslo")))
tc "city_of(person with no address)", nil, city_of(Person.new(nil))
tc "city_of(nil)", nil, city_of(nil)
uses(/&\./, "safe navigation &.")
avoids(/!=\s*nil|\.nil\?/, "nil checks")
avoids(/\bif\b/, "if")
