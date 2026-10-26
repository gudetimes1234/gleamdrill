def find_order(num_courses, prerequisites)
  # The same Kahn's algorithm as deciding whether it is possible, except the
  # order courses come off the ready list *is* the answer. Detecting the cycle
  # and producing the schedule are the same computation.
  waiting = Array.new(num_courses, 0)
  unlocks = Array.new(num_courses) { [] }

  prerequisites.each do |course, prereq|
    waiting[course] += 1
    unlocks[prereq] << course
  end

  ready = (0...num_courses).select { |c| waiting[c].zero? }
  order = []

  until ready.empty?
    course = ready.shift
    order << course
    unlocks[course].each do |following|
      waiting[following] -= 1
      ready << following if waiting[following].zero?
    end
  end

  # Stalled with courses left, so no order exists at all.
  order.length == num_courses ? order : []
end
