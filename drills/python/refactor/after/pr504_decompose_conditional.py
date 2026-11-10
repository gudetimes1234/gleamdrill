def is_summer(month):
    return 6 <= month <= 8


def summer_charge(quantity, plan):
    return quantity * plan["summer_rate"]


def regular_charge(quantity, plan):
    return quantity * plan["regular_rate"] + plan["service_charge"]


def charge(month, quantity, plan):
    if is_summer(month):
        return summer_charge(quantity, plan)
    return regular_charge(quantity, plan)
