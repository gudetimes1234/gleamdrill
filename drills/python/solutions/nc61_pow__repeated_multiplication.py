def myPow(x, n):
    magnitude = 1.0
    for _ in range(abs(n)):
        magnitude *= x
    return 1 / magnitude if n < 0 else magnitude
