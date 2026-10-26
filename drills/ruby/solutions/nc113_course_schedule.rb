def can_finish(num_courses, prerequisites)
  # Kahn's algorithm. Courses with nothing outstanding can be taken now;
  # taking one releases whatever depended on it. If the process stalls with
  # courses left, those courses depend on each other in a circle: a cycle is
  # exactly what "cannot be finished" means.
  waiting = Array.new(num_courses, 0)
  unlocks = Array.new(num_courses) { [] }

  prerequisites.each do |course, prereq|
    waiting[course] += 1
    unlocks[prereq] << course
  end

  ready = (0...num_courses).select { |c| waiting[c].zero? }
  taken = 0

  until ready.empty?
    course = ready.shift
    taken += 1
    unlocks[course].each do |following|
      waiting[following] -= 1
      ready << following if waiting[following].zero?
    end
  end

  taken == num_courses
end
