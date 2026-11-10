def domains(emails):
    seen = set()
    for email in emails:
        seen.add(email.split("@")[1])
    return sorted(seen)
