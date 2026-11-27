KEYPAD = {
    "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
    "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz",
}


def letterCombinations(digits):
    if not digits:  # @1
        return []  # @1
    return build(digits)  # @2


# One choice per digit, independently -- so the answer is the cross product of
# the letter sets. Written as a recursion here: pick a letter for the first
# digit, then every combination of the rest.
def build(digits):
    if not digits:  # @3
        return [""]  # @3
    tails = build(digits[1:])  # @4
    return [letter + tail for letter in KEYPAD.get(digits[0], "") for tail in tails]  # @5
