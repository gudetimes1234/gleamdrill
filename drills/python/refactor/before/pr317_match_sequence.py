def run_command(text):
    parts = text.split()
    if len(parts) == 1 and parts[0] == "look":
        return "You look around."
    elif len(parts) == 2 and parts[0] == "go":
        return f"You go {parts[1]}."
    elif len(parts) >= 2 and parts[0] == "take":
        return "You take " + " and ".join(parts[1:]) + "."
    else:
        return "Huh?"
