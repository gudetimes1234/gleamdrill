STATUS_TEXT = {
    200: "OK",
    301: "Moved",
    404: "Not Found",
    500: "Server Error",
}


def status_text(code):
    return STATUS_TEXT.get(code, "Unknown")
