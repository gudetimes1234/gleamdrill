def reverse_bits(n)
  # Write the number out in binary, pad to the full width, reverse the text,
  # read it back. The padding makes the thing the bit version keeps implicit,
  # that the width is 32 and not however many bits this value needs, impossible
  # to forget.
  n.to_s(2).rjust(32, "0").reverse.to_i(2)
end
