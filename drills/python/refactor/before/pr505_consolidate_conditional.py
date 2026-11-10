def disability_amount(employee):
    if employee["seniority"] < 2:
        return 0
    if employee["months_disabled"] > 12:
        return 0
    if employee["part_time"]:
        return 0
    return employee["salary"] / 10
