class Parcel
  attr_reader :weight

  def initialize(weight)
    @weight = weight
  end

  def <(other)
    weight < other.weight
  end

  def <=(other)
    weight <= other.weight
  end

  def >(other)
    weight > other.weight
  end

  def >=(other)
    weight >= other.weight
  end
end
