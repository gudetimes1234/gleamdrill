require "set"

def can_finish(num_courses, prerequisites)
  needs = Array.new(num_courses) { [] }
  prerequisites.each { |course, prereq| needs[course] << prereq }

  on_path = Set.new
  done = Set.new

  # Depth-first with three states rather than two. "Seen" is not enough: a
  # node reached twice down *different* branches is fine, while a node reached
  # again while still on the current path is a cycle. The in-progress set is
  # what tells those apart.
  visit = lambda do |course|
    return false if on_path.include?(course)
    return true if done.include?(course)

    on_path << course
    return false unless needs[course].all? { |prereq| visit.call(prereq) }

    on_path.delete(course)
    done << course
    true
  end

  (0...num_courses).all? { |course| visit.call(course) }
end
