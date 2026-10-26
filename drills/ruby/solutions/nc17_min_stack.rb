class MinStack
  def initialize
    @stack = []
    @mins = []
  end

  def push(val)
    @stack << val
    @mins << (@mins.empty? ? val : [val, @mins.last].min)
  end

  def pop
    @stack.pop
    @mins.pop
  end

  def top
    @stack.last
  end

  def get_min
    @mins.last
  end
end
