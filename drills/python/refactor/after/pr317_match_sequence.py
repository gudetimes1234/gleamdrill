def run_command(text):
    match text.split():
        case ["look"]:
            return "You look around."
        case ["go", direction]:
            return f"You go {direction}."
        case ["take", *items] if items:
            return "You take " + " and ".join(items) + "."
        case _:
            return "Huh?"
