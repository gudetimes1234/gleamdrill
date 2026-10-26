def india_offices(input)
  input.lines
       .drop(1)
       .reject { |line| line.strip.empty? }
       .map { |line| line.split(",").map(&:strip) }
       .select { |_city, country, _phone| country == "India" }
       .map { |city, _country, phone| { city:, phone: } }
end
