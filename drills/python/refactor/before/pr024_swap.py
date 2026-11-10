def fib(n):
    a = 0
    b = 1
    for _ in range(n):
        temp = a
        a = b
        b = temp + b
    return a
