def has_admin(users):
    return any(user["role"] == "admin" for user in users)
