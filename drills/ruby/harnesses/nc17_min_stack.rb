need :MinStack

stack = MinStack.new
stack.push(-2)
stack.push(0)
stack.push(-3)
tc "get_min() after push -2, 0, -3", -3, stack.get_min
stack.pop
tc "top() after pop()", 0, stack.top
tc "get_min() after pop()", -2, stack.get_min
