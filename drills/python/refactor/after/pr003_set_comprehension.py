def domains(emails):
    return sorted({email.split("@")[1] for email in emails})
