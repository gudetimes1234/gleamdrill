def undo_steps(actions):
    steps = []
    for i in range(len(actions) - 1, -1, -1):
        steps.append("undo " + actions[i])
    return steps
