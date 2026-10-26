class KthLargest
  def initialize(k, nums)
    @k = k
    @seen = nums.dup
  end

  # Keep the whole stream and sort on demand. Wrong for a real stream, since
  # memory grows without bound and every query costs a sort, but it is the
  # definition, and it is what the bounded heap has to be checked against.
  def add(val)
    @seen << val
    return nil if @seen.length < @k

    @seen.sort.reverse[@k - 1]
  end
end
