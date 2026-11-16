def characterReplacement(s, k):
    count = {}  # @1
    left = 0  # @2
    max_count = 0  # @3
    longest = 0  # @4

    for right in range(len(s)):  # @5
        count[s[right]] = count.get(s[right], 0) + 1  # @6
        max_count = max(max_count, count[s[right]])  # @7

        while (right - left + 1) - max_count > k:  # @8
            count[s[left]] -= 1  # @9
            left += 1  # @10

        longest = max(longest, right - left + 1)  # @11

    return longest  # @12
