def undo_steps(actions):
    return [f"undo {action}" for action in reversed(actions)]
