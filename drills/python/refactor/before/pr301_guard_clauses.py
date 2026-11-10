def pay_amount(employee):
    if employee.get("dead"):
        result = 0
    else:
        if employee.get("separated"):
            result = 100
        else:
            if employee.get("retired"):
                result = 200
            else:
                result = employee["salary"]
    return result
