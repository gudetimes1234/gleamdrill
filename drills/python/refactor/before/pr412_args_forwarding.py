def shout(func):
    def wrapper(name, greeting):
        return func(name, greeting).upper()

    return wrapper


@shout
def greet(name, greeting):
    return f"{greeting}, {name}!"
