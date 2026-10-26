def india_offices(input)
  lines = input.split("\n")
  first = true
  result = []
  lines.each do |line|
    if first
      first = false
      next
    end
    next if line.strip == ""

    record = line.split(",")
    if record[1].strip == "India"
      result << { city: record[0].strip, phone: record[2].strip }
    end
  end
  result
end
