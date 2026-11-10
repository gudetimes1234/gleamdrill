def can_comment(user):
    return not user["banned"] and user["verified"]
