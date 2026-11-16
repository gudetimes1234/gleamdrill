def findDuplicate(nums):
    # Read the array as a linked list: position i points at position nums[i].
    # Every value is a valid position and one value repeats, so two positions
    # point at the same place -- the list has a cycle, and the duplicate is its
    # entrance. Then it is Floyd's twice: once to meet inside the loop, once to
    # walk from the start and from the meeting point together until they agree
    # on where it begins.
    slow, fast = nums[0], nums[nums[0]]  # @1
    while slow != fast:  # @2
        slow, fast = nums[slow], nums[nums[fast]]  # @3

    slow = 0  # @4
    while slow != fast:  # @5
        slow, fast = nums[slow], nums[fast]  # @6
    return slow  # @7
