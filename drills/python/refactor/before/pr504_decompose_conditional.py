def charge(month, quantity, plan):
    if month >= 6 and month <= 8:
        return quantity * plan["summer_rate"]
    return quantity * plan["regular_rate"] + plan["service_charge"]
