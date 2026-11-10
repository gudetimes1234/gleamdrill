def summary(people):
    youngest = None
    total_salary = 0
    for person in people:
        if youngest is None or person["age"] < youngest:
            youngest = person["age"]
        total_salary += person["salary"]
    return youngest, total_salary
