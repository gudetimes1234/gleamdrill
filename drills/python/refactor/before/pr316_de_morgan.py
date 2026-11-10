def can_comment(user):
    return not (user["banned"] or not user["verified"])
