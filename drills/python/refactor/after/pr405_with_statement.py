class Lock:
    def __init__(self):
        self.log = []

    def acquire(self):
        self.log.append("acquire")

    def release(self):
        self.log.append("release")

    def __enter__(self):
        self.acquire()
        return self

    def __exit__(self, *exc_info):
        self.release()
        return False


def apply_all(lock, changes):
    with lock:
        for change in changes:
            if change < 0:
                raise ValueError("negative change")
            lock.log.append(change)
    return lock.log
