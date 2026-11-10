def active_emails(users):
    emails = []
    for user in users:
        if user["active"]:
            if user["email"]:
                if not user["email"].endswith("@test.com"):
                    emails.append(user["email"].lower())
    return emails
