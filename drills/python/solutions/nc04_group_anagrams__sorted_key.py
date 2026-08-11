from collections import defaultdict

def groupAnagrams(strs):
    # The sorted word itself is an anagram-invariant key. Shorter than tallying
    # letters, and it works for any alphabet rather than just a-z.
    groups = defaultdict(list)
    for s in strs:
        groups["".join(sorted(s))].append(s)
    return list(groups.values())
