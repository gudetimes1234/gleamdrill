require "set"

def find_order(num_courses, prerequisites)
  needs = Array.new(num_courses) { [] }
  prerequisites.each { |course, prereq| needs[course] << prereq }

  on_path = Set.new
  done = Set.new
  order = []

  # Depth-first, recording a course only *after* everything it depends on has
  # been recorded. That post-order is a valid schedule by construction (no
  # indegrees to maintain) and the in-progress set doubles as the cycle check,
  # which is what makes the impossible case fall out of the same walk.
  visit = lambda do |course|
    return false if on_path.include?(course)
    return true if done.include?(course)

    on_path << course
    return false unless needs[course].all? { |prereq| visit.call(prereq) }

    on_path.delete(course)
    done << course
    order << course
    true
  end

  return [] unless (0...num_courses).all? { |course| visit.call(course) }

  order
end
