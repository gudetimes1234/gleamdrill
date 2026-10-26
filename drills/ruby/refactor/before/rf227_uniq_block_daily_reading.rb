def first_per_day(readings)
  out = []
  readings.each do |reading|
    found = false
    out.each { |kept| found = true if kept[:day] == reading[:day] }
    out << reading unless found
  end
  out
end
