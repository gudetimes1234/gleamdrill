from collections import defaultdict

def groupAnagrams(strs):
    groups = defaultdict(list)  # @1
    for s in strs:  # @2
        key = [0] * 26  # @3
        for c in s:  # @4
            key[ord(c) - ord('a')] += 1  # @5
        groups[tuple(key)].append(s)  # @6
    return list(groups.values())  # @7
