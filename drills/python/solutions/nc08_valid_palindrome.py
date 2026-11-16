def isPalindrome(s):
    left, right = 0, len(s) - 1  # @1

    while left < right:  # @2
        while left < right and not s[left].isalnum():  # @3
            left += 1  # @3
        while left < right and not s[right].isalnum():  # @4
            right -= 1  # @4

        if s[left].lower() != s[right].lower():  # @5
            return False  # @5

        left += 1  # @6
        right -= 1  # @7

    return True  # @8
