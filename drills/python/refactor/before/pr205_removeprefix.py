def ticket_number(ref):
    ref = ref.strip()
    if ref.startswith("TICKET-"):
        ref = ref[len("TICKET-"):]
    return ref
