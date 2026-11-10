def has_admin(users):
    found = False
    for user in users:
        if user["role"] == "admin":
            found = True
            break
    return found
