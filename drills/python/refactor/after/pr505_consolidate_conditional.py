def is_not_eligible(employee):
    return (
        employee["seniority"] < 2
        or employee["months_disabled"] > 12
        or employee["part_time"]
    )


def disability_amount(employee):
    if is_not_eligible(employee):
        return 0
    return employee["salary"] / 10
