def canFinish(numCourses, prerequisites):
    needs = {c: [] for c in range(numCourses)}
    for course, prereq in prerequisites:
        needs[course].append(prereq)

    onPath = set()
    done = set()

    # Depth-first with three states rather than two. "Seen" is not enough: a
    # node reached twice down *different* branches is fine, while a node reached
    # again while still on the current path is a cycle. The in-progress set is
    # what tells those apart.
    def visit(course):
        if course in onPath:
            return False
        if course in done:
            return True
        onPath.add(course)
        for prereq in needs[course]:
            if not visit(prereq):
                return False
        onPath.discard(course)
        done.add(course)
        return True

    return all(visit(course) for course in range(numCourses))
