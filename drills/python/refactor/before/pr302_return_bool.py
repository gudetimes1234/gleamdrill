def can_vote(age, registered):
    if age >= 18 and registered:
        return True
    else:
        return False
