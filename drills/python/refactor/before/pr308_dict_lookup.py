def status_text(code):
    if code == 200:
        return "OK"
    elif code == 301:
        return "Moved"
    elif code == 404:
        return "Not Found"
    elif code == 500:
        return "Server Error"
    else:
        return "Unknown"
