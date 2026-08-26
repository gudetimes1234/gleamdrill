def reverseBits(n):
    # Write the number out in binary, pad to the full width, reverse the text,
    # read it back. Slower and allocates, but the padding makes the thing the
    # bit version keeps implicit -- that the width is 32, not however many bits
    # this particular value happens to need -- impossible to forget.
    return int(format(n, "032b")[::-1], 2)
