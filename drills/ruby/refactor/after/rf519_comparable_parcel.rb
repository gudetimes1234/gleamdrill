class Parcel
  include Comparable

  attr_reader :weight

  def initialize(weight)
    @weight = weight
  end

  def <=>(other)
    weight <=> other.weight
  end
end
