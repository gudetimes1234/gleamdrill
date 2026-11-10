def shout(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs).upper()

    return wrapper


@shout
def greet(name, greeting):
    return f"{greeting}, {name}!"
