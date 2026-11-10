def pay_amount(employee):
    if employee.get("dead"):
        return 0
    if employee.get("separated"):
        return 100
    if employee.get("retired"):
        return 200
    return employee["salary"]
