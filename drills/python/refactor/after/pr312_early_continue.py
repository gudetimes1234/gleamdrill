def active_emails(users):
    emails = []
    for user in users:
        if not user["active"]:
            continue
        if not user["email"]:
            continue
        if user["email"].endswith("@test.com"):
            continue
        emails.append(user["email"].lower())
    return emails
